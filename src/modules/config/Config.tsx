import React, {Component} from 'react';
import {observer} from "mobx-react";
import Loading from "../../common/component/Loading";
import NoContent from "../../common/component/NoContent";
import Paginate from "../../common/component/Paginate";
import {configStore} from "./ConfigStore";
import {requestUtils} from "../../common/utils/RequestUtil";
import AddConfig from "./components/AddConfig";
import EditConfig from "./components/EditConfig";
import DeleteConfig from "./components/DeleteConfig";


@observer
class Config extends Component {

    async componentDidMount() {
        await configStore.getConfig()
    }


    handlePageClick = async (data: any) => {
        configStore.page = data.selected;
        requestUtils.saveQueryParam(this.props, {page: configStore.page});
        await configStore.getConfig()
    };


    render() {
        return (
            <div className="config">
                <div className="content-wrapper">
                    <div className="row d-flex align-items-center justify-content-between mt-2 mb-3">
                        <div className="pl-2 pr-2 w-100 d-flex align-items-center">
                            <h3 className="mb-0 mr-3">Config</h3>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                                <span/>
                                <button type="button" onClick={() => configStore.clearForm()} data-toggle="modal" data-target="#addConfig" className="btn btn-md btn-outline-info">Create</button>
                            </div>
                            {configStore.isLoading ? <Loading/> :
                                <div className="table-responsive border mt-4">
                                    {configStore.listConfig && configStore.listConfig.length > 0 ?
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th><strong>ID</strong></th>
                                                <th><strong>Key</strong></th>
                                                <th><strong>Value</strong></th>
                                                <th><strong>Description</strong></th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {configStore.listConfig.map((item, i) => {
                                                return (
                                                    <tr key={i} className="position-relative">
                                                        <td>{item.id}</td>
                                                        <td>{item.keyValue}</td>
                                                        <td>{item.value}</td>
                                                        <td>{item.description}</td>
                                                        <td width="5%" className="text-center">
                                                            <button type="button" onClick={() => configStore.detailConfig(item.keyValue)} data-toggle="modal"
                                                                    data-target="#editConfig"
                                                                    className="btn btn-inverse-warning mr-2 btn-icon">
                                                                <i className="fas fa-pen"/>
                                                            </button>
                                                            <button type="button"
                                                                    onClick={() => configStore.id = item.keyValue}
                                                                    data-toggle="modal"
                                                                    data-target="#deleteConfig"
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
                                <Paginate currentPage={configStore.page} totalPage={configStore.totalPages}
                                          callback={this.handlePageClick}/>
                            </div>
                            <AddConfig/>
                            <EditConfig/>
                            <DeleteConfig/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Config;