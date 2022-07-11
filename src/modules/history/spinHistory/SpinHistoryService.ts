import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../../common/helpers/RequestHelper";
import {spinHistoryStore} from "./SpinHistoryStore";
import {data} from "jquery";


class SpinHistoryService {
    public getAll(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/spinHistories/?page=${spinHistoryStore.page}`);
    }

    public getDetail(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/spinHistories/${id}`);
    }

    public getSearchPlayerId(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/spinHistories/?playerId=${id}`);
    }

    public getSearchDate(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/spinHistories/?searchDate=${id}`);
    }
    public getSearchStatus(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/spinHistories/?giftStatus=${id}`);
    }

    public update(id: number, data:any): Promise<IApiResponse> {
        return putRequest(`/lucky_spin/api/v1/portal/spinHistories/${id}`, data);
    }

    public reSend(id: any) {
        return postRequest(`/lucky_spin/api/v1/portal/spinHistories/resendGift?id=${id}`, id);
    }


}

export const spinHistoryService = new SpinHistoryService();
