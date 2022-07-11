import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../../common/helpers/RequestHelper";
import {rewardHistoryStore} from "./RewardHistoryStore";


class RewardHistoryService {
    public getAll(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/rewardHistories/?page=${rewardHistoryStore.page}`);
    }

    public getSearchDate(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/rewardHistories/?searchDate=${id}`);
    }


    public getSearchPlayerId(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/rewardHistories/?playerId=${id}`);
    }

    public reSend(id: any) {
        return postRequest(`/lucky_spin/api/v1/portal/rewardHistories/resendGift?id=${id}`, id);
    }

}

export const rewardHistoryService = new RewardHistoryService();
