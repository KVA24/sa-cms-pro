import {observable} from "mobx";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {rewardHistoryService} from "./RewardHistoryService";
import {toastUtil} from "../../../common/utils/ToastUtil";


class RewardHistoryStore {
    @observable id: any = ''
    @observable page: any = 0
    @observable searchPlayerID: any = ''
    @observable searchDate: any = ''
    @observable totalPages: number = 0
    @observable isLoading: boolean = false
    @observable isLoadingBt: boolean = false
    @observable listRewardHistory: any[] = []

    @observable dataRequest: any = {
        id: 0,
        itemId: '',
        playerId: '',
    };

    clearForm(){
        this.dataRequest = {
            id: 0,
            itemId: '',
            playerId: '',
        }
    }

    async getAll(){
        this.isLoading = true
        const result = await rewardHistoryService.getAll()
        this.isLoading = false
        if(result.status === HttpStatusCode.OK){
            this.listRewardHistory = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }


    async getSearchPlayerId(){
        this.isLoading = true
        const result = await rewardHistoryService.getSearchPlayerId(this.searchPlayerID)
        this.isLoading = false
        if(result.status === HttpStatusCode.OK){
            this.listRewardHistory = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }

    async getSearchDate(){
        this.isLoading = true
        const result = await rewardHistoryService.getSearchDate(this.searchDate)
        this.isLoading = false
        if(result.status === HttpStatusCode.OK){
            this.listRewardHistory = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }

    async reSend() {
        let id = this.dataRequest.id
        const result = await rewardHistoryService.reSend(id);
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Resend success');

        } else toastUtil.error(result.body.message)
    }

}

export const rewardHistoryStore = new RewardHistoryStore()