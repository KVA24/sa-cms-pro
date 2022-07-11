import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../common/helpers/RequestHelper";
import {configStore} from "./ConfigStore";

class ConfigService {
    public getConfig(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/configs/?page=${configStore.page}`);
    }

    public getDetailConfig(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/configs/${id}`);
    }

    public addConfig(data: any): Promise<IApiResponse> {
        return postRequest(`/lucky_spin/api/v1/portal/configs/`, data);
    }

    public updateConfig(id: any, data:any): Promise<IApiResponse> {
        return putRequest(`/lucky_spin/api/v1/portal/configs/${id}`, data);
    }


    public deleteConfig(id: any): Promise<IApiResponse> {
        return deleteRequest(`/lucky_spin/api/v1/portal/configs/${id}`, {id});
    }

}

export const configService = new ConfigService();
