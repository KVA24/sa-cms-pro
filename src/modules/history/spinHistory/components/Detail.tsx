import React, {Component} from 'react';
import {observer} from "mobx-react";
import {spinHistoryStore} from "../SpinHistoryStore";

@observer
class Detail extends Component {

    render() {
        return (
            <div className="modal fade" id="detailSpinHistory" role="dialog">
                <div style={{maxWidth: `1010px`}}
                     className="modal-dialog w-100 75 d-flex align-items-center justify-content-center" role="document">
                    <div style={{maxWidth: `1010px`}} className="modal-content w-100 text-center">
                        <div className="closes" id={`close_detailSpinHistory`} data-dismiss="modal" aria-label="Close">
                            <i className="fas fa-times"/>
                        </div>
                        <div className="w-100 css_scroll d-flex justify-content-center">
                            <div style={{width: `1010px`}}>
                                <div className="modal-header pt-0">
                                    <h3 className="modal-title w-100 text-center">Detail</h3>
                                </div>
                                <div className="modal-body pt-0 pb-0">
                                    <div className="row">
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>Name</strong></th>
                                                <th><strong>NickName</strong></th>
                                                <th><strong>Address</strong></th>
                                                <th><strong>Phone</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <th>{spinHistoryStore.dataRequest.name}</th>
                                                <th>{spinHistoryStore.dataRequest.nickname}</th>
                                                <th>{spinHistoryStore.dataRequest.address}</th>
                                                <th>{spinHistoryStore.dataRequest.phone}</th>
                                            </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                                <div className="modal-footer d-flex align-items-center">
                                    <button type="button" className="btn btn-light" data-dismiss="modal"
                                            aria-label="Close">Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default Detail;