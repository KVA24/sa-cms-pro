import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../../common/helpers/RequestHelper";
import {userRewardStore} from "./UserRewardStore";


class UserRewardService {
    public getAll(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/userRewards/?page=${userRewardStore.page}`);
    }

    public getDetail(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/userRewards/${id}`);
    }

    public getSearchPlayerId(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/userRewards/?playerId=${id}`);
    }

    public update(id: number, data:any): Promise<IApiResponse> {
        return putRequest(`/lucky_spin/api/v1/portal/userRewards/${id}`, data);
    }
}

export const userRewardService = new UserRewardService();
