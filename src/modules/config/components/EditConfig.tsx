import React, {Component} from 'react';
import {observer} from "mobx-react";
import {configStore} from "../ConfigStore";

@observer
class EditConfig extends Component {

    render() {
        return (
            <div className="modal fade" id="editConfig" role="dialog">
                <div className="modal-dialog w-100 d-flex align-items-center justify-content-center" role="document">
                    <div className="modal-content w-100 text-center">
                        <div className="closes" id={`close_edit`} data-dismiss="modal" aria-label="Close">
                            <i className="fas fa-times" />
                        </div>
                        <div className="w-100 css_scroll d-flex justify-content-center">
                            <div style={{width: `1010px`}}>
                                <div className="modal-header pt-0">
                                    <h3 className="modal-title w-100 text-center">Edit Config</h3>
                                </div>
                                <div className="modal-body pt-0 pb-0">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">Key</label>
                                                <input type="text"
                                                       className="w-100 form-control"
                                                       value={configStore.dataRequest.keyValue}
                                                       disabled={true}
                                                       placeholder="Enter Key"
                                                       onChange={(e: any) => configStore.dataRequest.keyValue = e.currentTarget.value} />
                                            </div>
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">Value</label>
                                                <input type="text"
                                                       className="w-100 form-control"
                                                       value={configStore.dataRequest.value}
                                                       placeholder="Enter Value"
                                                       onChange={(e: any) => configStore.dataRequest.value = e.currentTarget.value} />
                                            </div>
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">Description</label>
                                                <input type="text"
                                                       className="w-100 form-control"
                                                       value={configStore.dataRequest.description}
                                                       placeholder="Enter Value"
                                                       onChange={(e: any) => configStore.dataRequest.description = e.currentTarget.value} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex align-items-center">
                                    <button type="button" className="btn btn-light" data-dismiss="modal" aria-label="Close">Back</button>
                                    {configStore.isLoadingBt ?
                                        <button type="button" className="btn btn-success text-white"> <i className="fa fa-spinner fa-spin" /></button>
                                        :
                                        <button type="button" className="btn btn-info text-white" onClick={() => configStore.editConfig()}>Save</button>
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

export default EditConfig;