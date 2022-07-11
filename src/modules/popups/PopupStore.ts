import {observable} from "mobx";
import {toastUtil} from "../../common/utils/ToastUtil";
import HttpStatusCode from "../../common/constants/HttpErrorCode";
import $ from "jquery";
import {popupService} from "./PopupService";

class PopupStore {
    @observable id: any = ''
    @observable page: any = 0
    @observable key: any = ''
    @observable totalPages: number = 0
    @observable isLoading: boolean = false
    @observable isLoadingBt: boolean = false
    @observable listPopup: any[] = []
    @observable dataRequest: any = {
        id: "",
        title: "",
        content: "",
        screenId: "",
        createdAt: "",
        updatedAt: "",
    };

    clearForm(){
        this.dataRequest = {
            id: "",
            title: "",
            content: "",
            screenId: "",
            createdAt: "",
            updatedAt: "",
        }
    }

    async getAll(){
        this.isLoading = true
        const result = await popupService.getAll()
        this.isLoading = false
        if(result.status === HttpStatusCode.OK){
            this.listPopup = result.body.data;
            this.totalPages = result.body.metadata.totalPages
        }
    }

    async getDetail(id: any){
        const result = await popupService.getDetail(id)
        if(result.status === HttpStatusCode.OK){
            this.dataRequest = result.body
        }

    }

    async add() {

        let data: any = {
            id: "",
            screenId: this.dataRequest.screenId,
            title: this.dataRequest.title,
            content: this.dataRequest.content,
        }
        this.isLoadingBt = true;
        const result = await popupService.add(data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Add success')
            $('#close_add').trigger('click')
            this.clearForm()
            await this.getAll()
        } else toastUtil.error(result.body.message)
    }


    async update(){
        let id = this.dataRequest.screenId;

        let data: any = {
            title: this.dataRequest.title,
            content: this.dataRequest.content,
        }

        this.isLoadingBt = true;
        const result = await popupService.update(id, data);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Update success');
            this.clearForm()
            $('#close_edit').trigger('click')
            this.listPopup.map((item) => {
                if (item.screenId == id) {
                    item.title = data.title
                    item.content = data.content
                }
            })
        } else toastUtil.error(result.body.message)
    }

    async delete(){
        this.isLoadingBt = true;
        const result = await popupService.delete(this.id);
        this.isLoadingBt = false;
        if (result.status === HttpStatusCode.OK) {
            toastUtil.success('Delete success')
            $('#close_delete').trigger('click')
            this.listPopup.map((item, i) => {
                if (item.keyValue === this.id) {
                    this.listPopup.splice(i, 1)
                }
            })
            await this.getAll()
        } else toastUtil.error(result.body.message)
    }
}

export const popupStore = new PopupStore()