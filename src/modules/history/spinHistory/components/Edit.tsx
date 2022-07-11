import React, {Component} from 'react';
import {observer} from "mobx-react";
import {spinHistoryStore} from "../SpinHistoryStore";
@observer
class Edit extends Component {

    render() {
        return (
            <div className="modal fade" id="editSpinHistory" role="dialog">
                <div  style={{maxWidth: `1010px`}} className="modal-dialog w-100 75 d-flex align-items-center justify-content-center" role="document">
                    <div  style={{maxWidth: `1010px`}} className="modal-content w-100 text-center">
                        <div className="closes" id={`close_editSpinHistory`} data-dismiss="modal" aria-label="Close">
                            <i className="fas fa-times" />
                        </div>
                        <div className="w-100 css_scroll d-flex justify-content-center">
                            <div style={{width: `1010px`}}>
                                <div className="modal-header pt-0">
                                    <h3 className="modal-title w-100 text-center">Edit Item</h3>
                                </div>
                                <div className="modal-body pt-0 pb-0">
                                    <div className="row">
                                        <select className={`w-100 form-control text-center`}
                                                value={spinHistoryStore.dataRequest.giftStatus}
                                                onChange={(e: any) => {
                                                    spinHistoryStore.dataRequest.giftStatus = e.currentTarget.value
                                                    console.log(spinHistoryStore.dataRequest.giftStatus)
                                                }}>
                                            <option value="NOT_SENT"
                                                    selected={spinHistoryStore.dataRequest.giftStatus == "NOT_SENT" && true}>NOT_SENT
                                            </option>
                                            <option value="INFO_NEED"
                                                    selected={spinHistoryStore.dataRequest.giftStatus == "INFO_NEED" && true}>INFO_NEED
                                            </option>
                                            <option value="GOTTEN"
                                                    selected={spinHistoryStore.dataRequest.giftStatus == "GOTTEN" && true}>GOTTEN
                                            </option>

                                        </select>

                                    </div>
                                </div>
                                <div className="modal-footer d-flex align-items-center">
                                    <button type="button" className="btn btn-light" data-dismiss="modal" aria-label="Close">Back</button>
                                    {spinHistoryStore.isLoadingBt ?
                                        <button type="button" className="btn btn-success text-white"> <i className="fa fa-spinner fa-spin" /></button>
                                        :
                                        <button type="button" className="btn btn-info text-white" onClick={() => spinHistoryStore.edit()} >Save</button>
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