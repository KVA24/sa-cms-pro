import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../common/component/Loading";
import NoContent from "../../common/component/NoContent";
import Paginate from "../../common/component/Paginate";
import {popupStore} from "./PopupStore";
import {requestUtils} from "../../common/utils/RequestUtil";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
import {dateUtils} from "../../common/utils/DateUtils";


@observer
class Popups extends Component {

    async componentDidMount() {
        await popupStore.getAll()
    }


    handlePageClick = async (data: any) => {
        popupStore.page = data.selected;
        requestUtils.saveQueryParam(this.props, {page: popupStore.page});
        await popupStore.getAll()
    };


    render() {
        return (
            <div className="config">
                <div className="content-wrapper">
                    <div className="row d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center">
                            <h3 className="mb-0 mr-3">Popup</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <span/>
                                <button type="button" onClick={() => popupStore.clearForm()} data-toggle="modal" data-target="#addPopup" className="btn btn-md btn-outline-info">Create</button>
                            </div>
                            {popupStore.isLoading ? <Loading/> :
                                <div className="table-responsive border mt-4">
                                    {popupStore.listPopup && popupStore.listPopup.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>ID</strong></th>
                                                <th><strong>Title</strong></th>
                                                <th><strong>Content</strong></th>
                                                <th><strong>ScreenId</strong></th>
                                                <th><strong>Create At</strong></th>
                                                <th><strong>Update At</strong></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {popupStore.listPopup.map((item, i) => {
                                                return (
                                                    <tr key={i} className="position-relative">
                                                        <td>{item.id}</td>
                                                        <td>{item.title}</td>
                                                        <td>{item.content}</td>
                                                        <td>{item.screenId}</td>
                                                        <td>{item.createdAt ? dateUtils.formatDate(item.createdAt) : ''}</td>
                                                        <td>{item.updatedAt ? dateUtils.formatDate(item.updatedAt) : ''}</td>
                                                        <td width="5%" className="text-center">
                                                            <button type="button" onClick={() => popupStore.getDetail(item.screenId)} data-toggle="modal"
                                                                    data-target="#editPopup"
                                                                    className="btn btn-inverse-warning mr-2 btn-icon">
                                                                <i className="fas fa-pen"/>
                                                            </button>
                                                            <button type="button"
                                                                    onClick={() => popupStore.id = item.screenId}
                                                                    data-toggle="modal"
                                                                    data-target="#deletePopup"
                                                                    className="btn btn-inverse-danger ml-2 btn-icon">
                                                                <i className="fas fa-trash-alt"/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                        :
                                        <div className="p-5">
                                            <NoContent/>
                                        </div>
                                    }
                                </div>
                            }
                            <div className="pagination mt-3">
                                <Paginate currentPage={popupStore.page} totalPage={popupStore.totalPages}
                                          callback={this.handlePageClick}/>
                            </div>
                            <Add/>
                            <Edit/>
                            <Delete/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popups;