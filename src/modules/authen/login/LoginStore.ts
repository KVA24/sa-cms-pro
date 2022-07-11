import {observable} from 'mobx';
import StorageService from "../../../common/service/StorageService";
import {accountService} from "../AccountService";
import {toastUtil} from "../../../common/utils/ToastUtil";
import HttpStatusCode from "../../../common/constants/HttpErrorCode";

import $ from "jquery";


export interface IApiResponse {
    readonly name: string | number;
    readonly avatarUrl: string;
    user: { id: number }
}

class LoginStore {
    @observable public isShowLoginForm = false;
    @observable public isProfile = false;
    @observable public id = "";
    @observable public displayName = "";
    @observable public role: any[] = [];
    @observable public username = "";
    @observable public password = "";
    @observable public confirmPassword = "";
    @observable public getProfile?: any;
    @observable public userData: null | IApiResponse = null;
    @observable public isManageShow: boolean = false;
    @observable public contacts: any[] = [];
    @observable public isLogin: boolean = false;
    @observable public isLoading: boolean = false;
    @observable public isVerifyForm: boolean = false;
    @observable isRequest: boolean = false;
    @observable public FormError?: {
        name?: string,
        pass?: string,
        message?: string,
    };

    setUserNameValue(e: any) {
        this.username = e.target.value;
        this.FormError = undefined
    }


    setPassValue(e: any) {
        this.password = e.target.value;
        this.FormError = undefined
    }


    async FormLogin() {
        setTimeout(() => this.isShowLoginForm = true, 100);
        this.FormError = {
            pass: '',
            message: '',
            name: ''
        }
    }

    async Login() {

        let userName: string = this.username;
        let passWord: string = this.password;

        if (userName === "") {
            this.FormError = {name: 'Username must not be blank'};
            return false;
        }

        if (passWord.length > 24 || passWord.length < 6) {
            this.FormError = {pass: "Password must be between 6 and 24 characters"};
            return false;
        }

        if (userName !== "" && passWord !== "") {
            this.isLoading = true;
            const data: any = await accountService.login(userName, passWord);
            this.isLoading = false;
            this.isRequest = true;
            if (data.status === HttpStatusCode.OK) {
                let token: string = data.body.token;
                StorageService.setToken(token);

                let refreshToken: string = data.body.refreshToken;
                StorageService.setRefreshToken(refreshToken);
                toastUtil.success('Login in success');

                this.isShowLoginForm = false;
                this.isLogin = true;
                this.isProfile = true;
            } else {
                this.FormError = {message: data.body.message};
                this.isShowLoginForm = false;
                this.isVerifyForm = true;
            }
        }

    }

    async enterLogin(e: any) {
        if (e.key === 'Enter') {
            await this.Login()
        }
    }


    async update(){

        let data: any = {
            password: this.password,
        }

        this.isLoading = true;
        const result = await accountService.update(data);
        this.isLoading = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Update success');

        } else toastUtil.error(result.body.message)
    }

    async logOut() {
        const result = await accountService.logOut();
        if (result.status === HttpStatusCode.OK) {
            StorageService.removeToken();
            StorageService.removeRefreshToken();
            window.location.href = "/"
        }
    }

}

export const loginStore = new LoginStore();
