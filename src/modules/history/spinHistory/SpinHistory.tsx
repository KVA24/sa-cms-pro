import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../../common/component/Loading";
import NoContent from "../../../common/component/NoContent";
import Paginate from "../../../common/component/Paginate";
import DatePickerSingle from "../../../common/component/DatePickerSingle";

import {requestUtils} from "../../../common/utils/RequestUtil";
import {spinHistoryStore} from "./SpinHistoryStore";
import {dateUtils} from "../../../common/utils/DateUtils";

import Edit from "./components/Edit";
import Detail from "./components/Detail";


@observer
class SpinHistory extends Component {

    async componentDidMount() {
        await spinHistoryStore.getAll()
    }

    componentWillUnmount() {
        spinHistoryStore.searchPlayerID = ''
        spinHistoryStore.searchDate = ''
    }

    handlePageClick = async (data: any) => {
        spinHistoryStore.page = data.selected;
        requestUtils.saveQueryParam(this.props, {page: spinHistoryStore.page});
        await spinHistoryStore.getAll()
    }

    async enterSearch(e: any, type?: any) {
        if (e.key === "Enter") {
            spinHistoryStore.page = 0;
            await spinHistoryStore.getSearchPlayerId();
        }
    }

    async searchEvent(type?: any) {
        spinHistoryStore.page = 0;
        await spinHistoryStore.getSearchPlayerId();
    }

    handleFilterDate = async (date: Date) => {
        spinHistoryStore.page = 0;
        spinHistoryStore.searchDate = date.getTime();
        await spinHistoryStore.getSearchDate();
    };

    render() {
        return (
            <div className="config">
                <div className="content-wrapper">
                    <div className="row d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center">
                            <h3 className="mb-0 mr-3">Spin History</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex">
                                    <div className="d-flex search_name mr-4 from-ground">
                                        <input type="text" className="search form-control"
                                               value={spinHistoryStore.searchPlayerID.trim()}
                                               onChange={(e: any) => spinHistoryStore.searchPlayerID = e.currentTarget.value.trim()}
                                               onKeyDown={(e: any) => this.enterSearch(e)}
                                               placeholder="Search by PlayerID"/>
                                        <button type="button" onClick={() => this.searchEvent()}
                                                className="btn btn-info d-flex align-items-center justify-content-center">
                                            <i className="far fa-search"/></button>
                                    </div>
                                    <div className="time_range d-flex align-items-center ml-4 mr-4"
                                         style={{cursor: 'pointer', width: 200}}>
                                        <DatePickerSingle
                                            selected={spinHistoryStore.searchDate}
                                            onChange={this.handleFilterDate}
                                        />
                                    </div>
                                    <div className="d-flex search_name ml-4 from-ground">
                                        <select className={`w-100 form-control text-center`}
                                                value={spinHistoryStore.searchStatus.trim()}
                                                onChange={(e: any) => {
                                                    spinHistoryStore.searchStatus = e.currentTarget.value.trim()
                                                    console.log(spinHistoryStore.searchStatus)
                                                    spinHistoryStore.getSearchStatus()
                                                }}
                                                placeholder="Search by Gift Status"
                                        >
                                            <option> Choose Status</option>
                                            <option value="NOT_SENT"
                                                    selected={spinHistoryStore.searchStatus == "NOT_SENT" && true}>NOT_SENT
                                            </option>
                                            <option value="INFO_NEED"
                                                    selected={spinHistoryStore.searchStatus == "INFO_NEED" && true}>INFO_NEED
                                            </option>
                                            <option value="GOTTEN"
                                                    selected={spinHistoryStore.searchStatus == "GOTTEN" && true}>GOTTEN
                                            </option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span/>
                                <button type="button"
                                        onClick={() => spinHistoryStore.reSend()}
                                        className="btn btn-md btn-outline-info">Re-Send All
                                </button>
                            </div>
                            {spinHistoryStore.isLoading ? <Loading/> :
                                <div className="table-responsive border mt-4">
                                    {spinHistoryStore.listSpinHistory && spinHistoryStore.listSpinHistory.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>ID</strong></th>
                                                <th><strong>ItemID</strong></th>
                                                <th><strong>ItemName</strong></th>
                                                {/*<th><strong>Create At</strong></th>*/}
                                                <th><strong>Update At</strong></th>
                                                <th><strong>PlayerId</strong></th>
                                                {/*<th><strong>Name</strong></th>*/}
                                                {/*<th><strong>NickName</strong></th>*/}
                                                {/*<th><strong>Address</strong></th>*/}
                                                {/*<th><strong>Phone</strong></th>*/}
                                                <th><strong>Gift Status</strong></th>
                                                <th><strong>Actions</strong></th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {spinHistoryStore.listSpinHistory.map((item, i) => {
                                                return (
                                                    <tr key={i} className="position-relative">
                                                        <td>{item.id}</td>
                                                        <td>{item.itemId}</td>
                                                        <td>{item.itemName}</td>
                                                        {/*<td>{item.createdAt ? dateUtils.formatDate(item.createdAt) : ''}</td>*/}
                                                        <td>{item.updatedAt ? dateUtils.formatDate(item.updatedAt) : ''}</td>
                                                        <td>{item.playerId}</td>
                                                        {/*<td>{item.name}</td>*/}
                                                        {/*<td>{item.nickname}</td>*/}
                                                        {/*<td>{item.address}</td>*/}
                                                        {/*<td>{item.phone}</td>*/}
                                                        <td>{item.giftStatus}</td>
                                                        <td width="5%" className="text-center">
                                                            <button type="button"
                                                                    onClick={() => spinHistoryStore.getDetail(item.id)}
                                                                    data-toggle="modal"
                                                                    data-target="#editSpinHistory"
                                                                    className="btn btn-inverse-warning btn-icon">
                                                                <i className="fas fa-pen"/>
                                                            </button>
                                                            <button type="button"
                                                                    onClick={() => spinHistoryStore.getDetail(item.id)}
                                                                    data-toggle="modal"
                                                                    data-target="#detailSpinHistory"
                                                                    className="btn btn-inverse-warning ml-2 btn-icon">
                                                                <i className="fas fa-info"/>
                                                            </button>
                                                            {
                                                                (item.giftStatus === "NOT_SENT") ?
                                                                    <button type="button"
                                                                            onClick={() =>{
                                                                                spinHistoryStore.dataRequest.id = item.id
                                                                                spinHistoryStore.reSend()
                                                                            }}
                                                                            className="btn btn-inverse-warning ml-2 btn-icon">
                                                                        <i className="fas fa-rocket" title="Re Send"/>
                                                                    </button>
                                                                    :
                                                                    true
                                                            }

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
                                <Paginate currentPage={spinHistoryStore.page} totalPage={spinHistoryStore.totalPages}
                                          callback={this.handlePageClick}/>
                            </div>

                            <Edit/>
                            <Detail/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SpinHistory;