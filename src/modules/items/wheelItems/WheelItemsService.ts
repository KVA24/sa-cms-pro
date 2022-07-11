import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../../common/helpers/RequestHelper";
import axios from "axios";

class WheelItemsService {

    public getItems(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/wheelItems/`);
    }

    public getDetail(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/wheelItems/${id}`);
    }

    public getNoneType(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/items/listWheelItem`);
    }

    public add(data: any): Promise<IApiResponse> {
        return postRequest(`/lucky_spin/api/v1/portal/wheelItems/`, data);
    }

    public update(id: number, data: any): Promise<IApiResponse> {
        return putRequest(`/lucky_spin/api/v1/portal/wheelItems/${id}`, data);
    }

    public delete(id: number): Promise<IApiResponse> {
        return deleteRequest(`/lucky_spin/api/v1/portal/wheelItems/${id}`, {id});
    }

    public publishWheelSort(data: any): Promise<IApiResponse> {
        return putRequest(`/lucky_spin/api/v1/portal/wheelItems/sort?listSort=${data}`, data)
    }

}

export const wheelItemsService = new WheelItemsService();
