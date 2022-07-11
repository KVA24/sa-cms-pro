import {deleteRequest, getRequest, IApiResponse, postRequest, putRequest} from "../../common/helpers/RequestHelper";


class PopupService {
    public getAll(): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/popups/`);
    }

    public getDetail(id: any): Promise<IApiResponse> {
        return getRequest(`/lucky_spin/api/v1/portal/popups/${id}`);
    }

    public add(data: any): Promise<IApiResponse> {
        return postRequest(`/lucky_spin/api/v1/portal/popups/`, data);
    }

    public update(id: any, data:any): Promise<IApiResponse> {
        return putRequest(`/lucky_spin/api/v1/portal/popups/${id}`, data);
    }


    public delete(id: any): Promise<IApiResponse> {
        return deleteRequest(`/lucky_spin/api/v1/portal/popups/${id}`, {id});
    }

}

export const popupService = new PopupService();
