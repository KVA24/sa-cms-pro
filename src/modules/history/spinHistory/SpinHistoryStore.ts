import {observable} from "mobx";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {spinHistoryService} from "./SpinHistoryService";
import {toastUtil} from "../../../common/utils/ToastUtil";
import $ from "jquery";
import {itemsService} from "../../items/gameItems/GameItemsService";

export enum IStatus {
    ACTIVE = "GOTTEN",
    INACTIVE = "SPIN"
}

class SpinHistoryStore {
    @observable id: any = ''
    @observable page: any = 0
    @observable searchPlayerID: any = ''
    @observable searchDate: any = ''
    @observable searchStatus: any = ''
    @observable totalPages: number = 0
    @observable isLoading: boolean = false
    @observable isLoadingBt: boolean = false
    @observable listSpinHistory: any[] = []

    @observable dataRequest: any = {
        id: 0,
        itemId: '',
        itemName: '',
        image: '',
        playerId: '',
        name: '',
        nickname: '',
        address: '',
        phone: '',
        giftStatus: '',
    };

    clearForm() {
        this.dataRequest = {
            id: 0,
            itemId: '',
            itemName: '',
            image: '',
            playerId: '',
            name: '',
            nickname: '',
            address: '',
            phone: '',
            giftStatus: '',
        }
    }

    async getAll() {
        this.isLoading = true
        const result = await spinHistoryService.getAll()
        this.isLoading = false
        if (result.status === HttpStatusCode.OK) {
            this.listSpinHistory = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }

    async getSearchPlayerId() {
        this.isLoading = true
        const result = await spinHistoryService.getSearchPlayerId(this.searchPlayerID)
        this.isLoading = false
        if (result.status === HttpStatusCode.OK) {
            this.listSpinHistory = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }

    async getSearchStatus() {
        this.isLoading = true
        const result = await spinHistoryService.getSearchStatus(this.searchStatus)
        this.isLoading = false
        if (result.status === HttpStatusCode.OK) {
            this.listSpinHistory = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }

    async getSearchDate() {
        this.isLoading = true
        const result = await spinHistoryService.getSearchDate(this.searchDate)
        this.isLoading = false
        if (result.status === HttpStatusCode.OK) {
            this.listSpinHistory = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }

    async getDetail(id: any) {
        const result = await spinHistoryService.getDetail(id);
        if (result.status === HttpStatusCode.OK) {
            this.dataRequest = result.body;
        }
    }

    async edit() {
        let id = this.dataRequest.id

        let data: any = {
            giftStatus: this.dataRequest.giftStatus
        }

        this.isLoadingBt = true;
        const result = await spinHistoryService.update(id, data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Update item success');
            $('#close_editSpinHistory').trigger('click')
            this.clearForm()
            this.listSpinHistory.map((item) => {
                if (item.id == id) {
                    item.status = data.status
                }
            })
            await this.getAll();
        } else toastUtil.error(result.body.message)
    }

    async reSend() {
        let id = this.dataRequest.id
        const result = await spinHistoryService.reSend(id);
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Resend success');

        } else toastUtil.error(result.body.message)
    }


}

export const spinHistoryStore = new SpinHistoryStore()