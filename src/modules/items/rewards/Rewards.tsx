import React, {Component} from 'react';
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import Paginate from "../../../common/component/Paginate";
import {rewardStore} from "./RewardStore";
import {observer} from "mobx-react";
import {requestUtils} from "../../../common/utils/RequestUtil";
import Add from "./components/Add";
import Delete from "./components/Delete";
import Edit from "./components/Edit";

@observer
class WheelItems extends Component {

    async componentDidMount() {
        // await itemsStore.getSource()
        await rewardStore.getRewards();

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
        rewardStore.page = data.selected;
        requestUtils.saveQueryParam(this.props, {page: rewardStore.page});
        await rewardStore.getRewards();
    };

    render() {
        return (
            <div className="collection">
                <div className="content-wrapper">

                    <div className="d-flex justify-content-between align-items-center">
                        <span/>
                        <button type="button" onClick={() => rewardStore.clearForm()} data-toggle="modal"
                                data-target="#addReward"
                                className="btn btn-md btn-outline-info">Create
                        </button>
                    </div>
                    {rewardStore.isLoading ? <Loading/> :
                        <div className="table-responsive border mt-4">
                            {rewardStore.listItems && rewardStore.listItems.length > 0 ?
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th><strong>ID</strong></th>
                                        <th><strong>ItemId</strong></th>
                                        <th><strong>Name</strong></th>
                                        <th><strong>Image </strong></th>
                                        <th><strong>Time to earn</strong></th>
                                        <th><strong>Actions</strong></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rewardStore.listItems.map((item, i) => {
                                        return (
                                            <tr key={i} className="position-relative">
                                                <td>{item.id}</td>
                                                <td>{item.itemId}</td>
                                                <td>{item.name}</td>
                                                <td>{item.image}</td>
                                                <td>{item.timesToEarn}</td>

                                                <td width="5%" className="text-center">
                                                    <button type="button"
                                                            onClick={() => rewardStore.getDetail(item.id)}
                                                            data-toggle="modal"
                                                            data-target="#editReward"
                                                            className="btn btn-inverse-warning btn-icon">
                                                        <i className="fas fa-pen"/>
                                                    </button>
                                                    <button type="button"
                                                            onClick={() => rewardStore.id = item.id}
                                                            data-toggle="modal"
                                                            data-target="#deleteReward"
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
                        <Paginate currentPage={rewardStore.page} totalPage={rewardStore.totalPages}
                                  callback={this.handlePageClick}/>
                    </div>

                    <Add/>
                    <Delete/>
                    <Edit/>

                </div>
            </div>
        );
    }
}

export default WheelItems;