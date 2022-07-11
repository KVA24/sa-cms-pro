import React, {Component} from 'react';
import {observer} from "mobx-react";

interface IProps{
    action: any
}

@observer
class ConfirmArchive extends Component<IProps, any> {

    render() {

        return (
            <div className="modal fade" id="modal_confirm_archive" tabIndex={-1} role="dialog" aria-hidden="true">
                <div className="modal-dialog h-75 d-flex align-items-center justify-content-center" role="document">
                    <div className="modal-content">
                        <div className="modal-header pt-2 pb-2">
                            <button type="button" id="close_archive" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h2 className="modal-title w-100 text-center">Are you sure ?</h2>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn" data-dismiss="modal">Cancel</button>
                            <button type="button" onClick={() => this.props.action()} className="btn btn-info">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmArchive;