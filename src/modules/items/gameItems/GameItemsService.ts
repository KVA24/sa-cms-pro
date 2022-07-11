import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../../common/helpers/RequestHelper";
import {itemsStore} from "./GameItemsStore";

class GameItemsService {

    public getItem(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/items/?page=${itemsStore.page}`);
    }

    public getDetail(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/items/${id}`);
    }

    public addItem(data: any): Promise<IApiResponse> {
        return postRequest(`/lucky_spin/api/v1/portal/items/`, data);
    }

    public updateItem(id: number, data:any): Promise<IApiResponse> {
        return putRequest(`/lucky_spin/api/v1/portal/items/${id}`, data);
    }

    public deleteItem(id: number): Promise<IApiResponse> {
        return deleteRequest(`/lucky_spin/api/v1/portal/items/${id}`, {id});
    }

}

export const itemsService = new GameItemsService();
