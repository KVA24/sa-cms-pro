import React, {Component} from 'react';
import {observer} from "mobx-react";
import {css} from "@emotion/core";
import { requestUtils } from '../../../src/common/utils/RequestUtil';
import Loading from '../../../src/common/component/Loading';
import {itemsStore, TabActive} from "./ItemsStore";
import GameItems from "./gameItems/GameItems";
import WheelItems from "./wheelItems/WheelItems";
import Rewards from "./rewards/Rewards";
import Nav from "../layouts/Nav";
import SideBar from "../layouts/SideBar";
import Redirect from "../router/router";

@observer
class Items extends Component<any, any> {

    public activeTab(tab: any) {
        requestUtils.saveQueryParam(this.props, {tab: tab});
        itemsStore.activeTab = tab
    }

    render() {
        return (
            <div className="content-wrapper update-account">
                <div className="row d-flex align-items-center justify-content-between mb-3">
                    <div className="ml-2 d-flex align-items-baseline flex-wrap mt-3 mb-2">
                        <h2 className="mr-4 mb-0">Items</h2>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item" onClick={() => this.activeTab(TabActive.GameItems)}>
                                <a className={`nav-link ${itemsStore.activeTab === TabActive.GameItems ? "active show" : ""}`}
                                   id="profile-tab" data-toggle="tab"
                                   href="#game_items"
                                   role="tab"
                                   aria-controls="profile-1"
                                   aria-selected="false">Game Items</a>
                            </li>
                            <li className="nav-item" onClick={() => this.activeTab(TabActive.WheelItems)}>
                                <a className={`nav-link ${itemsStore.activeTab === TabActive.WheelItems ? "active show" : ""}`}
                                   id="contact-tab" data-toggle="tab"
                                   href="#wheel_items"
                                   role="tab"
                                   aria-controls="contact-1"
                                   aria-selected="false">Wheel Items</a>
                            </li>
                            <li className="nav-item" onClick={() => this.activeTab(TabActive.Rewards)}>
                                <a className={`nav-link ${itemsStore.activeTab === TabActive.Rewards ? "active show" : ""}`}
                                   id="contact-tab" data-toggle="tab"
                                   href="#rewards"
                                   role="tab"
                                   aria-controls="contact-1"
                                   aria-selected="false">Rewards</a>
                            </li>
                        </ul>
                        { itemsStore.isLoading ? <Loading/> :
                            <div className="tab-content pt-3">
                                <div className={`tab-pane fade ${itemsStore.activeTab === TabActive.GameItems ? "active show" : ""}`} id="game_items" role="tabpanel" aria-labelledby="profile-tab">
                                    <GameItems/>
                                </div>
                                <div className={`tab-pane fade ${itemsStore.activeTab === TabActive.WheelItems ? "active show" : ""}`} id="wheel_items" role="tabpanel" aria-labelledby="contact-tab">
                                    <WheelItems/>
                                </div>
                                <div className={`tab-pane fade ${itemsStore.activeTab === TabActive.Rewards ? "active show" : ""}`} id="rewards" role="tabpanel" aria-labelledby="contact-tab">
                                    <Rewards/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Items;

const css_img = css`
width: 65px !important;
height: 65px  !important;
border-radius: 50%;`;

const css_input_file = css`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
opacity: 0;
cursor: pointer;`;

const css_icon = css`
font-size: 20px;`;

const btn_show = css`
padding: 0;
top: 50%;
right: 15px;
transform: translateY(-50%);`;