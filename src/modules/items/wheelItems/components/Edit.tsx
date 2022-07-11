import React, {Component} from 'react';
import {observer} from "mobx-react";
import {wheelItemsStore} from "../WheelItemsStore";
import {itemsStore} from "../../gameItems/GameItemsStore";

@observer
class Edit extends Component {

    render() {
        return (
            <div className="modal fade" id="editWheel" role="dialog">
                <div style={{maxWidth: `1010px`}}
                     className="modal-dialog w-100 75 d-flex align-items-center justify-content-center" role="document">
                    <div style={{maxWidth: `1010px`}} className="modal-content w-100 text-center">
                        <div className="closes" id={`close_editWheel`} data-dismiss="modal" aria-label="Close">
                            <i className="fas fa-times"/>
                        </div>
                        <div className="w-100 css_scroll d-flex justify-content-center">
                            <div style={{width: `1010px`}}>
                                <div className="modal-header pt-0">
                                    <h3 className="modal-title w-100 text-center">Edit Reward</h3>
                                </div>
                                <div className="modal-body pt-0 pb-0">
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">Item Type<sup className="text-danger">*</sup></label>
                                                <select className={`w-100 form-control`} value={wheelItemsStore.dataRequest.itemType} onChange={(e: any) => wheelItemsStore.dataRequest.itemType = e.currentTarget.value}>
                                                    <option value="">Choose ItemType</option>
                                                    <option value="SPIN" selected={wheelItemsStore.dataRequest.itemType == "SPIN" && true}>SPIN</option>
                                                    <option value="PHYSICAL" selected={wheelItemsStore.dataRequest.itemType == "PHYSICAL" && true}>PHYSICAL</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">Percent Gold(%)</label>
                                                <input type="text" className="w-100 form-control"
                                                       value={wheelItemsStore.dataRequest.percentGold}

                                                       onChange={(e: any) => wheelItemsStore.dataRequest.percentGold = e.currentTarget.value}/>
                                            </div>
                                            <div className="form-group w-100">
                                                <label className="d-flex align-items-center">Percent Diamond(%)</label>
                                                <input type="text" className="w-100 form-control"
                                                       value={wheelItemsStore.dataRequest.percentDiamond}

                                                       onChange={(e: any) => wheelItemsStore.dataRequest.percentDiamond = e.currentTarget.value}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer d-flex align-items-center">
                                    <button type="button" className="btn btn-light" data-dismiss="modal"
                                            aria-label="Close">Back
                                    </button>
                                    {wheelItemsStore.isLoadingBt ?
                                        <button type="button" className="btn btn-success text-white"><i
                                            className="fa fa-spinner fa-spin"/></button>
                                        :
                                        <button type="button" className="btn btn-info text-white"
                                                onClick={() => wheelItemsStore.edit()}
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