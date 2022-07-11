import {observable} from "mobx";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {userRewardService} from "./UserRewardService";
import {toastUtil} from "../../../common/utils/ToastUtil";
import $ from "jquery";

class UserRewardStore {
    @observable id: any = ''
    @observable playerId: any = ''
    @observable amount: any = ''
    @observable page: any = 0
    @observable searchPlayerID: any = ''
    @observable searchDate: any = ''
    @observable totalPages: number = 0
    @observable isLoading: boolean = false
    @observable isLoadingBt: boolean = false
    @observable listUserReward: any[] = []

    @observable dataRequest: any = {
        playerId: '',
        count: '',
        unused: '',
        lastLoggedIn: '',
        createdAt: '',
        updatedAt: '',

    };

    clearForm(){
        this.dataRequest = {
            playerId: '',
            count: '',
            unused: '',
            lastLoggedIn: '',
            createdAt: '',
            updatedAt: '',
        }
    }

    async getAll(){
        this.isLoading = true
        const result = await userRewardService.getAll()
        this.isLoading = false
        if(result.status === HttpStatusCode.OK){
            this.listUserReward = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }


    async getSearchPlayerId(){
        this.isLoading = true
        const result = await userRewardService.getSearchPlayerId(this.searchPlayerID)
        this.isLoading = false
        if(result.status === HttpStatusCode.OK){
            this.listUserReward = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }

    async getDetail(id: any){
        const result = await userRewardService.getDetail(id);
        if(result.status === HttpStatusCode.OK){
            this.dataRequest = result.body;
        }
    }


    async edit(){
        let id = this.dataRequest.playerId

        let data: any = {
            amount : this.dataRequest.amount
        }

        this.isLoadingBt = true;
        const result = await userRewardService.update(id, data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Update item success');
            $('#close_editUserReward').trigger('click')
            this.clearForm()
            this.listUserReward.map((item) => {
                if (item.playerId == id) {
                    item.amount = data.amount
                }
            })
            await this.getAll();
        } else toastUtil.error(result.body.message)
    }

}

export const userRewardStore = new UserRewardStore()