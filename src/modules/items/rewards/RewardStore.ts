import {observable} from "mobx";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {rewardService} from "./RewardService";
import $ from "jquery";
import {toastUtil} from "../../../common/utils/ToastUtil";
import {itemsService} from "../gameItems/GameItemsService";
import {wheelItemsStore} from "../wheelItems/WheelItemsStore";


export enum IState {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

class RewardStore {
    @observable id: any = '';
    @observable page: number = 0;
    @observable state: any = IState.ACTIVE;
    @observable totalPages: number = 0;
    @observable isLoading: boolean = false;
    @observable isLoadingBt: boolean = false;
    @observable listItems: any[] = [];
    @observable listNoneType: any[] = [];
    @observable dataRequest: any = {
        id: "",
        itemId: "",
        timesToEarn: ""
    };

    clearForm() {
        this.dataRequest = {
            id: "",
            itemId: "",
            timesToEarn: ""
        };
    }

    async getRewards() {
        this.isLoading = true;
        const result = await rewardService.getRewards();
        this.isLoading = false;
        if (result.status === HttpStatusCode.OK) {
            this.listItems = result.body.data;
            this.totalPages = result.body.metadata.totalPages
        }
    }

    async getDetail(id: any) {
        const result = await rewardService.getDetail(id);
        if (result.status === HttpStatusCode.OK) {
            this.dataRequest = result.body;
        }
    }

    async getNoneType(){
        this.isLoading = true;
        const result = await rewardService.getNoneType();
        this.isLoading = false;
        if(result.status === HttpStatusCode.OK){
            this.listNoneType = result.body;
        }
    }

    async add() {

        let data: any = {
            itemId: this.dataRequest.itemId,
            timesToEarn: this.dataRequest.timesToEarn,
        }

        this.isLoadingBt = true;
        const result = await rewardService.addReward(data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Add reward success')
            $('#close_addReward').trigger('click')
            this.clearForm()
            await this.getRewards()
            await this.getNoneType()
            await wheelItemsStore.getNoneType()
        } else toastUtil.error(result.body.message)
    }

    async edit(){
        let id = this.dataRequest.id;

        let data: any = {
            timesToEarn : this.dataRequest.timesToEarn,
        }

        this.isLoadingBt = true;
        const result = await rewardService.updateReward(id, data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Update reward success');
            this.clearForm()
            $('#close_editReward').trigger('click')
            this.listItems.map((item) => {
                if (item.id == id) {
                    item.timesToEarn = data.timesToEarn
                }
            })
        } else toastUtil.error(result.body.message)
    }

    async delete() {
        this.isLoadingBt = true;
        const result = await rewardService.deleteReward(this.id);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Delete reward success')
            $('#close_Reward').trigger('click')
            this.listItems.map((item, i) => {
                if (item.id === this.id) {
                    this.listItems.splice(i, 1)
                }
            })

        } else toastUtil.error(result.body.message)
    }


}

export const rewardStore = new RewardStore();