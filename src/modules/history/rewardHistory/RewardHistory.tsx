import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import Paginate from "../../../common/component/Paginate";
import {requestUtils} from "../../../common/utils/RequestUtil";
import {rewardHistoryStore} from "./RewardHistoryStore";
import {dateUtils} from "../../../common/utils/DateUtils";
import DatePickerSingle from "../../../common/component/DatePickerSingle";

@observer
class RewardHistory extends Component {

    async componentDidMount() {
        await rewardHistoryStore.getAll()
    }


    handlePageClick = async (data: any) => {
        rewardHistoryStore.page = data.selected;
        requestUtils.saveQueryParam(this.props, {page: rewardHistoryStore.page});
        await rewardHistoryStore.getAll()
    };

    componentWillUnmount() {
        rewardHistoryStore.searchPlayerID = ''
        rewardHistoryStore.searchDate = ''
    }

    async enterSearch(e: any, type?: any) {
        if (e.key === "Enter") {
            rewardHistoryStore.page = 0;
            await rewardHistoryStore.getSearchPlayerId();
        }
    }

    async searchEvent(type?: any) {
        rewardHistoryStore.page = 0;
        await rewardHistoryStore.getSearchPlayerId();
    }

    handleFilterDate = async (date: Date) => {
        rewardHistoryStore.page = 0;
        rewardHistoryStore.searchDate = date.getTime();
        await rewardHistoryStore.getSearchDate();
    };

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
                                        <input type="text" className="search form-control" value={rewardHistoryStore.searchPlayerID.trim()}
                                               onChange={(e: any) => rewardHistoryStore.searchPlayerID = e.currentTarget.value.trim()}
                                               onKeyDown={(e: any) => this.enterSearch(e)} placeholder="Search by PlayerID"/>
                                        <button type="button" onClick={() => this.searchEvent()}
                                                className="btn btn-info d-flex align-items-center justify-content-center">
                                            <i className="far fa-search"/></button>
                                    </div>
                                    <div className="time_range d-flex align-items-center ml-4"
                                         style={{cursor: 'pointer', width: 200}}>
                                        <DatePickerSingle
                                            selected={rewardHistoryStore.searchDate}
                                            onChange={this.handleFilterDate}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span/>
                                <button type="button"
                                        onClick={() => rewardHistoryStore.reSend()}
                                        className="btn btn-md btn-outline-info">Re-Send All
                                </button>
                            </div>
                            {rewardHistoryStore.isLoading ? <Loading/> :
                                <div className="table-responsive border mt-4">
                                    {rewardHistoryStore.listRewardHistory && rewardHistoryStore.listRewardHistory.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>ID</strong></th>
                                                <th><strong>ItemID</strong></th>
                                                <th><strong>PlayerId</strong></th>
                                                <th><strong>Create At</strong></th>
                                                {/*<th><strong>Update At</strong></th>*/}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {rewardHistoryStore.listRewardHistory.map((item, i) => {
                                                return (
                                                    <tr key={i} className="position-relative">
                                                        <td>{item.id}</td>
                                                        <td>{item.itemId}</td>
                                                        <td>{item.playerId}</td>
                                                        <td>{item.createdAt ? dateUtils.formatDate(item.createdAt) : ''}</td>
                                                        {/*<td>{item.updatedAt ? dateUtils.formatDate(item.updatedAt) : ''}</td>*/}
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
                                <Paginate currentPage={rewardHistoryStore.page} totalPage={rewardHistoryStore.totalPages}
                                          callback={this.handlePageClick}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RewardHistory;