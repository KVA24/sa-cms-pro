import React, {Component} from 'react';
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import Paginate from "../../../common/component/Paginate";
import {itemsStore} from "./GameItemsStore";
import {observer} from "mobx-react";
import {requestUtils} from "../../../common/utils/RequestUtil";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Delete from "./components/Delete";

@observer
class GameItems extends Component {

    async componentDidMount() {
        // await itemsStore.getSource()
        await itemsStore.getItems();
    }

    status(state: string) {
        switch (state) {
            case "ACTIVE":
                return <span className="text-success">Active</span>;
            case "INACTIVE":
                return <span className="text-secondary">Inactive</span>;
        }
    }

    handlePageClick = async (data: any) => {
        itemsStore.page = data.selected;
        requestUtils.saveQueryParam(this.props, {page: itemsStore.page});
        await itemsStore.getItems();
    };

    render() {
        return (
            <div className="collection">
                <div className="content-wrapper">

                    <div className="d-flex justify-content-between align-items-center">
                        <span/>
                        <button type="button" onClick={() => itemsStore.clearForm()} data-toggle="modal"
                                data-target="#addItem" className="btn btn-md btn-outline-info">Create
                        </button>
                    </div>
                    {itemsStore.isLoading ? <Loading/> :
                        <div className="table-responsive border mt-4">
                            {itemsStore.listItems && itemsStore.listItems.length > 0 ?
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th><strong>ItemId</strong></th>
                                        <th><strong>GameItemId</strong></th>
                                        <th><strong>Name</strong></th>
                                        <th><strong>Image </strong></th>
                                        <th><strong>ExpireTime </strong></th>
                                        <th><strong>Type </strong></th>
                                        <th><strong>Is Unlimited </strong></th>
                                        <th><strong>Status</strong></th>
                                        <th><strong>Actions</strong></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {itemsStore.listItems.map((item, i) => {
                                        return (
                                            <tr key={i} className="position-relative">
                                                <td>{item.id}</td>
                                                <td>{item.gameItemId}</td>
                                                <td>{item.name}</td>
                                                <td>{item.image}</td>
                                                <td>{item.expireTime}</td>
                                                <td>{item.type}</td>
                                                <td>{item.isUnlimited}</td>
                                                <td>{item.status}</td>

                                                <td width="5%" className="text-center">
                                                    <button type="button"
                                                            onClick={() => itemsStore.getDetail(item.id)}
                                                            data-toggle="modal"
                                                            data-target="#editItem"
                                                            className="btn btn-inverse-warning btn-icon">
                                                        <i className="fas fa-pen"/>
                                                    </button>
                                                    <button type="button"
                                                            onClick={() => itemsStore.id = item.id}
                                                            data-toggle="modal"
                                                            data-target="#deleteItem"
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
                                    <NoContent message="Chưa có dữ liệu"/>
                                </div>
                            }
                        </div>
                    }
                    <div className="pagination mt-3">
                        <Paginate currentPage={itemsStore.page} totalPage={itemsStore.totalPages}
                                  callback={this.handlePageClick}/>
                    </div>

                    <Add/>
                    <Edit/>
                    <Delete/>

                </div>
            </div>
        );
    }
}

export default GameItems;