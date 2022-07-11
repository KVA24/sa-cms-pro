import React, {Component} from 'react';
import {observer} from "mobx-react";
import {userRewardStore} from "../UserRewardStore";

@observer
class Edit extends Component {

    render() {
        return (
            <div className="modal fade" id="editUserReward" role="dialog">
                <div  style={{maxWidth: `1010px`}} className="modal-dialog w-100 75 d-flex align-items-center justify-content-center" role="document">
                    <div  style={{maxWidth: `1010px`}} className="modal-content w-100 text-center">
                        <div className="closes" id={`close_editUserReward`} data-dismiss="modal" aria-label="Close">
                            <i className="fas fa-times" />
                        </div>
                        <div className="w-100 css_scroll d-flex justify-content-center">
                            <div style={{width: `1010px`}}>
                                <div className="modal-header pt-0">
                                    <h3 className="modal-title w-100 text-center">Edit Amount Spin</h3>
                                </div>
                                <div className="modal-body pt-0 pb-0">
                                    <div className="row d-flex justify-content-center">

                                        <div className="form-group w-75">
                                            <label className="d-flex align-items-center">Amount</label>
                                            <input type="text"
                                                   className="w-100 form-control"
                                                   value={userRewardStore.dataRequest.amount}
                                                   placeholder="Enter Amount"
                                                   onChange={(e: any) => userRewardStore.dataRequest.amount = e.currentTarget.value} />
                                        </div>

                                    </div>
                                </div>
                                <div className="modal-footer d-flex align-items-center">
                                    <button type="button" className="btn btn-light" data-dismiss="modal" aria-label="Close">Back</button>
                                    {userRewardStore.isLoadingBt ?
                                        <button type="button" className="btn btn-success text-white"> <i className="fa fa-spinner fa-spin" /></button>
                                        :
                                        <button type="button" className="btn btn-info text-white" onClick={() => userRewardStore.edit()} >Add</button>
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