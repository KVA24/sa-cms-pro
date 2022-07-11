import React, {Component} from 'react';
import {observer} from "mobx-react";
import {itemsStore} from "../GameItemsStore";
@observer
class Edit extends Component {

    render() {
        return (
            <div className="modal fade" id="editItem" role="dialog">
                <div  style={{maxWidth: `1010px`}} className="modal-dialog w-100 75 d-flex align-items-center justify-content-center" role="document">
                    <div  style={{maxWidth: `1010px`}} className="modal-content w-100 text-center">
                        <div className="closes" id={`close_editItem`} data-dismiss="modal" aria-label="Close">
                            <i className="fas fa-times" />
                        </div>
                        <div className="w-100 css_scroll d-flex justify-content-center">
                            <div style={{width: `1010px`}}>
                                <div className="modal-header pt-0">
                                    <h3 className="modal-title w-100 text-center">Edit Item</h3>
                                </div>
                                <div className="modal-body pt-0 pb-0">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">GameItemId</label>
                                                <input type="text" className="w-100 form-control" value={itemsStore.dataRequest.gameItemId} onChange={(e: any) => itemsStore.dataRequest.gameItemId = e.currentTarget.value} />
                                            </div>
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">Name</label>
                                                <input type="text" className="w-100 form-control" value={itemsStore.dataRequest.name} onChange={(e: any) => itemsStore.dataRequest.name = e.currentTarget.value} />
                                            </div>
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">ExpireTime</label>
                                                <input type="text" className="w-100 form-control" value={itemsStore.dataRequest.expireTime} onChange={(e: any) => itemsStore.dataRequest.expireTime = e.currentTarget.value} />
                                            </div>

                                        </div>
                                        <div className="col-6">
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">Image</label>
                                                <input type="text" className="w-100 form-control" value={itemsStore.dataRequest.image} onChange={(e: any) => itemsStore.dataRequest.image = e.currentTarget.value} />
                                            </div>
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">Status<sup className="text-danger">*</sup></label>
                                                <select className={`w-100 form-control`} value={itemsStore.dataRequest.status} onChange={(e: any) => itemsStore.dataRequest.status = e.currentTarget.value}>
                                                    <option value="">Choose Status</option>
                                                    <option value="ACTIVE" selected={itemsStore.dataRequest.status == "ACTIVE" && true}>ACTIVE</option>
                                                    <option value="INACTIVE" selected={itemsStore.dataRequest.status == "INACTIVE" && true}>INACTIVE</option>
                                                </select>
                                            </div>

                                            {
                                                (itemsStore.dataRequest.type !== "PHYSICAL") ?
                                                    <div className="form-group w-100">
                                                        <label className="d-flex align-items-center">Is Unlimited<sup className="text-danger">*</sup></label>
                                                        <select className={`w-100 form-control`} value={itemsStore.dataRequest.isUnlimited} onChange={(e: any) => itemsStore.dataRequest.isUnlimited = e.currentTarget.value}>
                                                            <option value="">Choose</option>
                                                            <option value="TRUE" selected={itemsStore.dataRequest.isUnlimited == "TRUE" && true}>TRUE</option>
                                                            <option value="FALSE" selected={itemsStore.dataRequest.isUnlimited == "FALSE" && true}>FALSE</option>
                                                        </select>
                                                    </div>
                                                    :
                                                    true
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex align-items-center">
                                    <button type="button" className="btn btn-light" data-dismiss="modal" aria-label="Close">Back</button>
                                    {itemsStore.isLoadingBt ?
                                        <button type="button" className="btn btn-success text-white"> <i className="fa fa-spinner fa-spin" /></button>
                                        :
                                        <button type="button" className="btn btn-info text-white" onClick={() => itemsStore.edit()} >Save</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;