import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import Paginate from "../../../common/component/Paginate";
import {requestUtils} from "../../../common/utils/RequestUtil";
import {spinAmountHistoryStore} from "./SpinAmountHistoryStore";
import {dateUtils} from "../../../common/utils/DateUtils";
import DatePickerSingle from "../../../common/component/DatePickerSingle";

@observer
class SpinAmountHistory extends Component {

    async componentDidMount() {
        await spinAmountHistoryStore.getAll()
    }


    handlePageClick = async (data: any) => {
        spinAmountHistoryStore.page = data.selected;
        requestUtils.saveQueryParam(this.props, {page: spinAmountHistoryStore.page});
        await spinAmountHistoryStore.getAll()
    };

    componentWillUnmount() {
        spinAmountHistoryStore.searchPlayerID = ''
        spinAmountHistoryStore.searchDate = ''
    }

    async enterSearch(e: any, type?: any) {
        if (e.key === "Enter") {
            spinAmountHistoryStore.page = 0;
            await spinAmountHistoryStore.getSearchPlayerId();
        }
    }

    async searchEvent(type?: any) {
        spinAmountHistoryStore.page = 0;
        await spinAmountHistoryStore.getSearchPlayerId();
    }

    handleFilterDate = async (date: Date) => {
        spinAmountHistoryStore.page = 0;
        spinAmountHistoryStore.searchDate = date.getTime();
        await spinAmountHistoryStore.getSearchDate();
    };

    render() {
        return (
            <div className="config">
                <div className="content-wrapper">
                    <div className="row d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center">
                            <h3 className="mb-0 mr-3">Spin Amount History</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex">
                                    <div className="d-flex search_name mr-4 from-ground">
                                        <input type="text" className="search form-control" value={spinAmountHistoryStore.searchPlayerID.trim()}
                                               onChange={(e: any) => spinAmountHistoryStore.searchPlayerID = e.currentTarget.value.trim()}
                                               onKeyDown={(e: any) => this.enterSearch(e)} placeholder="Search by PlayerID"/>
                                        <button type="button" onClick={() => this.searchEvent()}
                                                className="btn btn-info d-flex align-items-center justify-content-center">
                                            <i className="far fa-search"/></button>
                                    </div>
                                {/*    <div className="time_range d-flex align-items-center ml-4"*/}
                                {/*         style={{cursor: 'pointer', width: 200}}>*/}
                                {/*        <DatePickerSingle*/}
                                {/*            selected={spinAmountHistoryStore.searchDate}*/}
                                {/*            onChange={this.handleFilterDate}*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                </div>
                            </div>
                            {spinAmountHistoryStore.isLoading ? <Loading/> :
                                <div className="table-responsive border mt-4">
                                    {spinAmountHistoryStore.listSpinAmountHistory && spinAmountHistoryStore.listSpinAmountHistory.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>ID</strong></th>
                                                <th><strong>Player ID</strong></th>
                                                <th><strong>Action</strong></th>
                                                <th><strong>Amount</strong></th>
                                                {/*<th><strong>Update At</strong></th>*/}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {spinAmountHistoryStore.listSpinAmountHistory.map((item, i) => {
                                                return (
                                                    <tr key={i} className="position-relative">
                                                        <td>{item.id}</td>
                                                        <td>{item.playerId}</td>
                                                        <td>{item.action}</td>
                                                        <td>{item.amount}</td>
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
                                <Paginate currentPage={spinAmountHistoryStore.page} totalPage={spinAmountHistoryStore.totalPages}
                                          callback={this.handlePageClick}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SpinAmountHistory;
