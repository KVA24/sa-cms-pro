


import {observable} from "mobx";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";
import {spinAmountHistoryService} from "./SpinAmountHistoryService";

class SpinAmountHistoryStore {
    @observable id: any = ''
    @observable page: any = 0
    @observable searchPlayerID: any = ''
    @observable searchDate: any = ''
    @observable totalPages: number = 0
    @observable isLoading: boolean = false
    @observable isLoadingBt: boolean = false
    @observable listSpinAmountHistory: any[] = []

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
        const result = await spinAmountHistoryService.getAll()
        this.isLoading = false
        if(result.status === HttpStatusCode.OK){
            this.listSpinAmountHistory = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }


    async getSearchPlayerId(){
        this.isLoading = true
        const result = await spinAmountHistoryService.getSearchPlayerId(this.searchPlayerID)
        this.isLoading = false
        if(result.status === HttpStatusCode.OK){
            this.listSpinAmountHistory = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }

    async getSearchDate(){
        this.isLoading = true
        const result = await spinAmountHistoryService.getSearchDate(this.searchDate)
        this.isLoading = false
        if(result.status === HttpStatusCode.OK){
            this.listSpinAmountHistory = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
            this.page = result.body.metadata.page;
        }
    }

}

export const spinAmountHistoryStore = new SpinAmountHistoryStore()