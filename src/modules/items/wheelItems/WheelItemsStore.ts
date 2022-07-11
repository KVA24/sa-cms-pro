import {observable} from "mobx";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {wheelItemsService} from "./WheelItemsService";
import $ from "jquery";
import {toastUtil} from "../../../common/utils/ToastUtil";
import {itemsService} from "../gameItems/GameItemsService";
import {rewardStore} from "../rewards/RewardStore";

export enum IType {
    SPIN = "SPIN",
    PHYSICAL = "PHYSICAL"
}

class WheelItemsStore {
    @observable isChanged: boolean = false;
    @observable id: any = '';
    @observable page: number = 0;
    @observable type = IType.SPIN;
    @observable totalPages: number = 0;
    @observable isLoading: boolean = false;
    @observable isLoadingBt: boolean = false;
    @observable listItems: any[] = [];
    @observable listNoneType: any[] = [];
    // @observable wheelItemDetail: any = {
    //     id: 0,
    //     itemId: "",
    //     name: "",
    //     image: "",
    //     sort: "",
    //     itemType: "",
    //     percentGold: "",
    //     percentDiamond: ""
    // };

    @observable dataRequest: any = {
        id: 0,
        itemId: "",
        name: "",
        image: "",
        sort: "",
        itemType: "",
        percentGold: "",
        percentDiamond: ""
    };

    clearForm() {
        this.dataRequest = {
            id: 0,
            itemId: "",
            name: "",
            image: "",
            sort: "",
            itemType: "",
            percentGold: "",
            percentDiamond: ""
        };
    }

    async getItems() {
        this.isLoading = true;
        const result = await wheelItemsService.getItems();
        this.isLoading = false;
        if (result.status === HttpStatusCode.OK) {
            this.listItems = result.body.data;
            this.totalPages = result.body.metadata.totalPages
        }
    }

    async getDetail(id: any) {
        const result = await wheelItemsService.getDetail(id);
        if (result.status === HttpStatusCode.OK) {
            this.dataRequest = result.body;
        }
    }

    async getNoneType() {
        this.isLoading = true;
        const result = await wheelItemsService.getNoneType();
        this.isLoading = false;
        if (result.status === HttpStatusCode.OK) {
            this.listNoneType = result.body;
        }
    }

    reorder = (startIndex: number, endIndex: number) => {
        const results: any[] = Array.from(this.listItems);
        const [removed] = results.splice(startIndex, 1);
        results.splice(endIndex, 0, removed);

        //resort
        results.forEach(function (item, index) {
            item.sort = index
        });

        this.listItems = results;
    };

    async publishWheelSort() {
        let listSort: any[] = []
        this.listItems.map((item: any) => listSort.push(item.id));
        console.log(listSort);
        const response = await wheelItemsService.publishWheelSort(listSort);
        if (response.status === HttpStatusCode.OK) {
            this.isChanged = false;
            toastUtil.success("Update Success");
        } else {
            toastUtil.error(response.body.message);
        }
    }


    async add() {

        let data: any = {
            itemId: this.dataRequest.itemId,
            itemType: this.dataRequest.itemType,
            percentGold: this.dataRequest.percentGold,
            percentDiamond: this.dataRequest.percentDiamond
        }

        this.isLoadingBt = true;
        const result = await wheelItemsService.add(data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Add reward success')
            $('#close_addWheel').trigger('click')
            this.clearForm()
            await this.getItems()
            await this.getNoneType()
            await rewardStore.getNoneType()
        } else toastUtil.error(result.body.message)
    }

    async edit() {
        let id = this.dataRequest.id;

        let data: any = {
            itemId: this.dataRequest.itemId,
            itemType: this.dataRequest.itemType,
            percentGold: this.dataRequest.percentGold,
            percentDiamond: this.dataRequest.percentDiamond
        }

        this.isLoadingBt = true;
        const result = await wheelItemsService.update(id, data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Update reward success');
            this.clearForm()
            $('#close_editWheel').trigger('click')
            this.listItems.map((item) => {
                if (item.id == id) {
                    item.itemId = data.itemId
                    item.itemType = data.itemType
                    item.percentGold = data.percentGold
                    item.percentDiamond = data.percentDiamond
                }
            })
        } else toastUtil.error(result.body.message)
    }

    async delete() {
        this.isLoadingBt = true;
        const result = await wheelItemsService.delete(this.id);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Delete reward success')
            $('#close_Wheel').trigger('click')
            this.listItems.map((item, i) => {
                if (item.id === this.id) {
                    this.listItems.splice(i, 1)
                }
            })

        } else toastUtil.error(result.body.message)
    }


}

export const wheelItemsStore = new WheelItemsStore();