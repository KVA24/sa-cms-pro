import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../../common/helpers/RequestHelper";

class RewardService {

    public getRewards(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/rewards/`);
    }

    public getDetail(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/rewards/${id}`);
    }

    public getNoneType(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/items/listReward`);
    }

    public addReward(data: any): Promise<IApiResponse> {
        return postRequest(`/lucky_spin/api/v1/portal/rewards/`, data);
    }

    public updateReward(id: number, data:any): Promise<IApiResponse> {
        return putRequest(`/lucky_spin/api/v1/portal/rewards/${id}`, data);
    }

    public deleteReward(id: number): Promise<IApiResponse> {
        return deleteRequest(`/lucky_spin/api/v1/portal/rewards/${id}`, {id});
    }


}

export const rewardService = new RewardService();
