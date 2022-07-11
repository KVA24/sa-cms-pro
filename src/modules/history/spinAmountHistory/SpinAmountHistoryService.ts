import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../../common/helpers/RequestHelper";
import {spinAmountHistoryStore} from "./SpinAmountHistoryStore";


class SpinAmountHistory {
    public getAll(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/spinAmountHistories/?page=${spinAmountHistoryStore.page}`);
    }

    public getSearchDate(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/spinAmountHistories/?searchDate=${id}`);
    }

    public getSearchPlayerId(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/spinAmountHistories/?playerId=${id}`);
    }

}

export const spinAmountHistoryService = new SpinAmountHistory();

