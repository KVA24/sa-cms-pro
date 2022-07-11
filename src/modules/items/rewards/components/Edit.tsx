import React, {Component} from 'react';
import {observer} from "mobx-react";
import {rewardStore} from "../RewardStore";

@observer
class Edit extends Component {

    render() {
        return (
            <div className="modal fade" id="editReward" role="dialog">
                <div style={{maxWidth: `1010px`}}
                     className="modal-dialog w-100 75 d-flex align-items-center justify-content-center" role="document">
                    <div style={{maxWidth: `1010px`}} className="modal-content w-100 text-center">
                        <div className="closes" id={`close_editReward`} data-dismiss="modal" aria-label="Close">
                            <i className="fas fa-times"/>
                        </div>
                        <div className="w-100 css_scroll d-flex justify-content-center">
                            <div style={{width: `1010px`}}>
                                <div className="modal-header pt-0">
                                    <h3 className="modal-title w-100 text-center">Edit Reward</h3>
                                </div>
                                <div className="modal-body pt-0 pb-0">
                                    <div className="row">
                                        <div className="form-group w-100">
                                            <label className="d-flex align-items-center">TimeToEarn</label>
                                            <input type="text" className="w-100 form-control"
                                                   value={rewardStore.dataRequest.timesToEarn}

                                                   onChange={(e: any) => rewardStore.dataRequest.timesToEarn = e.currentTarget.value}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex align-items-center">
                                    <button type="button" className="btn btn-light" data-dismiss="modal"
                                            aria-label="Close">Back
                                    </button>
                                    {rewardStore.isLoadingBt ?
                                        <button type="button" className="btn btn-success text-white"><i
                                            className="fa fa-spinner fa-spin"/></button>
                                        :
                                        <button type="button" className="btn btn-info text-white"
                                                onClick={() => rewardStore.edit()}
                                        >Save</button>
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