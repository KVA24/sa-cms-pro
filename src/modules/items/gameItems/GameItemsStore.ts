import {observable} from "mobx";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {toastUtil} from "../../../common/utils/ToastUtil";
import $ from "jquery";
import {itemsService} from "./GameItemsService";
import {rewardStore} from "../rewards/RewardStore";
import {wheelItemsStore} from "../wheelItems/WheelItemsStore";


export enum IState {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE"
}

class GameItemsStore {
    @observable id: any = '';
    @observable page: number = 0;
    @observable state: any = IState.ACTIVE;
    @observable totalPages: number = 0;
    @observable isLoading: boolean = false;
    @observable isLoadingBt: boolean = false;
    @observable listItems: any[] = [];
    @observable dataRequest: any = {
        id: 0,
        gameItemId: "",
        name: "",
        image: "",
        expireTime: "",
        status: "",
        isUnlimited: "",
    };

    clearForm(){
        this.dataRequest = {
            id: 0,
            gameItemId:"",
            name: "",
            image: "",
            expireTime: "",
            status: "",
            isUnlimited: "",
        };
    }

    async getItems(){
        this.isLoading = true;
        const result = await itemsService.getItem();
        this.isLoading = false;
        if(result.status === HttpStatusCode.OK){
            this.listItems = result.body.data;
            this.totalPages = result.body.metadata.totalPages
        }
    }

    async getDetail(id: any){
        const result = await itemsService.getDetail(id);
        if(result.status === HttpStatusCode.OK){
            this.dataRequest = result.body;
        }
    }


    async add() {

        let data: any = {
            gameItemId: this.dataRequest.gameItemId,
            name: this.dataRequest.name,
            image: this.dataRequest.image,
            expireTime: this.dataRequest.expireTime,
            status: this.dataRequest.status,
        }

        this.isLoadingBt = true;
        const result = await itemsService.addItem(data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Add item success')
            $('#close_addItem').trigger('click')
            this.clearForm()
            await this.getItems()
            await rewardStore.getNoneType()
            await wheelItemsStore.getNoneType()
        } else toastUtil.error(result.body.message)
    }

    async edit(){
        let id = this.dataRequest.id;

        let data: any = {
            gameItemId: this.dataRequest.gameItemId,
            name: this.dataRequest.name,
            image: this.dataRequest.image,
            expireTime: this.dataRequest.expireTime,
            status: this.dataRequest.status,
        }

        this.isLoadingBt = true;
        const result = await itemsService.updateItem(id, data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Update item success');
            this.clearForm()
            $('#close_editItem').trigger('click')
            this.listItems.map((item) => {
                if (item.id == id) {
                    item.gameItemId = data.gameItemId
                    item.name = data.name
                    item.image = data.image
                    item.expireTime = data.expireTime
                    item.status = data.status
                }
            })
        } else toastUtil.error(result.body.message)
    }

    async delete(){
        this.isLoadingBt = true;
        const result = await itemsService.deleteItem(this.id);
        this.isLoadingBt = false;
        if(result.status === HttpStatusCode.OK){
            toastUtil.success('Delete item success')
            $('#close_Item').trigger('click')
            this.listItems.map((item, i) => {
                if(item.id === this.id){
                    this.listItems.splice(i, 1)
                }
            })

        }else  toastUtil.error(result.body.message)
    }



}

export const itemsStore = new GameItemsStore();