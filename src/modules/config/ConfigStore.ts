import {observable} from "mobx";
import {toastUtil} from "../../common/utils/ToastUtil";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import $ from "jquery";
import {configService} from "./ConfigService";

class ConfigStore {
    @observable id: any = ''
    @observable page: any = 0
    @observable key: any = ''
    @observable totalPages: number = 0
    @observable isLoading: boolean = false
    @observable isLoadingBt: boolean = false
    @observable dataRequest: {id: any, keyValue: string, value: string, description: string} = {id: '', keyValue: '', value: '', description: ''}
    @observable listConfig: any[] = []

    clearForm(){
        this.dataRequest = {
            id: '',
            keyValue: '',
            value: '',
            description: '',
        }
    }

    async getConfig(){
        this.isLoading = true
        const result = await configService.getConfig()
        this.isLoading = false
        if(result.status === HttpStatusCode.OK){
            this.listConfig = result.body.data;
            this.totalPages = result.body.metadata.totalPages
        }
    }

    async detailConfig(id: any){
        const result = await configService.getDetailConfig(id)
        if(result.status === HttpStatusCode.OK){
            this.dataRequest = result.body
        }

    }


    async addConfig() {
        let {keyValue, value, description} = this.dataRequest;

        let data: any = {
            keyValue: keyValue,
            value: value,
            description: description,
        }
        this.isLoadingBt = true;
        const result = await configService.addConfig(data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Add config success')
            $('#close_add').trigger('click')
            this.clearForm()
            await this.getConfig()
        } else toastUtil.error(result.body.message)
    }


    async editConfig(){
        let {keyValue, value, description} = this.dataRequest;

        let data: any = {
            value: value,
            description: description,
        }

        this.isLoadingBt = true;
        const result = await configService.updateConfig(keyValue, data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Update config success');
            this.clearForm()
            $('#close_edit').trigger('click')
            this.listConfig.map((item) => {
                if (item.keyValue == keyValue) {
                    item.value = data.value
                    item.description = data.description
                }
            })
        } else toastUtil.error(result.body.message)
    }

    async deleteConfig(){
        this.isLoadingBt = true;
        const result = await configService.deleteConfig(this.id);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Delete config success')
            $('#close_delete').trigger('click')
            this.listConfig.map((item, i) => {
                if (item.keyValue === this.id) {
                    this.listConfig.splice(i, 1)
                }
            })
        } else toastUtil.error(result.body.message)
    }
}

export const configStore = new ConfigStore()