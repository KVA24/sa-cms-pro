import {postRequest, IApiResponse, getRequest, deleteRequest, putRequest} from "../../common/helpers/RequestHelper";
import StorageService from "../../common/service/StorageService";

class AccountService {
    public login(username: string, password: string): Promise<IApiResponse> {
        return postRequest(`/lucky_spin/api/v1/portal/auth/signin`, {username, password});
    }

    public logOut(): Promise<IApiResponse> {
        return deleteRequest('/lucky_spin/api/v1/portal/auth/signout', {refreshToken: StorageService.getRefreshToken()});
    }

    public update(data: any): Promise<IApiResponse> {
        return putRequest(`lucky_spin/api/v1/portal/accounts/admin`,data)
    }

}

export const accountService = new AccountService();
