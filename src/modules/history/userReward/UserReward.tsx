import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import Paginate from "../../../common/component/Paginate";
import {requestUtils} from "../../../common/utils/RequestUtil";
import {dateUtils} from "../../../common/utils/DateUtils";
import {userRewardStore} from "./UserRewardStore";
import Edit from "./components/Edit";


@observer
class UserReward extends Component {

    async componentDidMount() {
        await userRewardStore.getAll()
    }


    handlePageClick = async (data: any) => {
        userRewardStore.page = data.selected;
        requestUtils.saveQueryParam(this.props, {page: userRewardStore.page});
        await userRewardStore.getAll()
    };

    componentWillUnmount() {
        userRewardStore.searchPlayerID = ''
        userRewardStore.searchDate = ''
    }

    async enterSearch(e: any, type?: any) {
        if (e.key === "Enter") {
            userRewardStore.page = 0;
            await userRewardStore.getSearchPlayerId();
        }
    }

    async searchEvent(type?: any) {
        userRewardStore.page = 0;
        await userRewardStore.getSearchPlayerId();
    }

    render() {
        return (
            <div className="config">
                <div className="content-wrapper">
                    <div className="row d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center">
                            <h3 className="mb-0 mr-3">Reward History</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">

                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex">
                                    <div className="d-flex search_name mr-4 from-ground">
                                        <input type="text" className="search form-control"
                                               value={userRewardStore.searchPlayerID.trim()}
                                               onChange={(e: any) => userRewardStore.searchPlayerID = e.currentTarget.value.trim()}
                                               onKeyDown={(e: any) => this.enterSearch(e)}
                                               placeholder="Search by PlayerID"/>
                                        <button type="button" onClick={() => this.searchEvent()}
                                                className="btn btn-info d-flex align-items-center justify-content-center">
                                            <i className="far fa-search"/></button>
                                    </div>

                                </div>
                            </div>
                            {userRewardStore.isLoading ? <Loading/> :
                                <div className="table-responsive border mt-4">
                                    {userRewardStore.listUserReward && userRewardStore.listUserReward.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>PlayerId</strong></th>
                                                <th><strong>Count</strong></th>
                                                <th><strong>Unused</strong></th>
                                                <th><strong>LastLoggedIn</strong></th>
                                                <th><strong>Create At</strong></th>
                                                <th><strong>Update At</strong></th>
                                                <th><strong>Action</strong></th>

                                            </tr>
                                            </thead>
                                            <tbody>
                                            {userRewardStore.listUserReward.map((item, i) => {
                                                return (
                                                    <tr key={i} className="position-relative">
                                                        <td>{item.playerId}</td>
                                                        <td>{item.count}</td>
                                                        <td>{item.unused}</td>
                                                        <td>{item.lastLoggedIn}</td>
                                                        <td>{item.createdAt ? dateUtils.formatDate(item.createdAt) : ''}</td>
                                                        <td>{item.updatedAt ? dateUtils.formatDate(item.updatedAt) : ''}</td>
                                                        <td width="5%" className="text-center">
                                                            <button type="button" onClick={() => userRewardStore.getDetail(item.playerId)}
                                                                    data-toggle="modal"
                                                                    data-target="#editUserReward"
                                                                    className="btn btn-inverse-warning mr-2 btn-icon">
                                                                <i className="fas fa-pen"/>
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
                                <Paginate currentPage={userRewardStore.page} totalPage={userRewardStore.totalPages}
                                          callback={this.handlePageClick}/>
                            </div>

                            <Edit/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserReward;