import React, {Component} from 'react';
import {observer} from "mobx-react";
import {number_format} from "../utils/Utils";
import {css} from "@emotion/core";


@observer
class Statistics extends Component<{ data: any[] }, any> {


    render() {

        return (
            <div className="statistics mb-4">
                <div className="row justify-content-center">
                    {this.props.data && this.props.data.map((item: any, i: any) => {
                        return (
                            <div className="col-md-2 p-2 mr-4 info_statistic" key={i} css={css_statistic}>
                                {item.tooltip && <i className="fas fa-info position-absolute" title={item.tooltip}/>}
                                <h2 className="font-weight-light w-100 text-center text-black">{item.value ? number_format(item.value) : 0}</h2>
                                <div className="title d-flex justify-content-center align-items-center">
                                    <span>{item.label}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Statistics;

const css_statistic = css`
  width: 240px !important;
  i{
    top: 8px;
    right: 8px;
    width: 22px;
    height: 22px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
  }
`