import React, {Component, useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import "./styles/sidebar.scss";
import { profileStore } from '../profile/ProfileStore';
import {RoleUser} from '../../common/constants/Constants'
import $ from "jquery"
import {loginStore} from "../authen/login/LoginStore";

@observer
class SideBar extends Component {
    state = {
        link: ""
    };

    data: any = [
        {
            id: 0,
            role: RoleUser.ADMIN,
            menu: [

                // {
                //     "id": 0,
                //     "name": "User",
                //     "isShow": false,
                //     "icon": "fas fa-user-friends",
                //     "rootMenu": ['/users'],
                //     "subMenu": [
                //         {
                //             "id": 0,
                //             "name": "User list",
                //             "icon": "fas fa-user-friends",
                //             "link": '/users'
                //         }
                //     ]
                // },
                {
                    "id": 1,
                    "name": "Lucky Spin",
                    "isShow": false,
                    "icon": "",
                    "rootMenu": ['/luckyspin'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "Items",
                            "icon": "fas fa-user-friends",
                            "link": '/items'
                        },
                        {
                            "id": 1,
                            "name": "Popups",
                            "icon": "fas fa-user-friends",
                            "link": '/popups'
                        },

                    ]
                },
                {
                    "id": 2,
                    "name": "History",
                    "isShow": false,
                    "icon": "",
                    "rootMenu": ['/history'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "Spin History",
                            "icon": "fas fa-user-friends",
                            "link": '/spinHistory'
                        },
                        {
                            "id": 1,
                            "name": "Reward History",
                            "icon": "fas fa-user-friends",
                            "link": '/rewardHistory'
                        },
                        {
                            "id": 2,
                            "name": "User Reward",
                            "icon": "fas fa-user-friends",
                            "link": '/userReward'
                        },
                        {
                            "id": 3,
                            "name": "Spin Amount History",
                            "icon": "fas fa-user-friends",
                            "link": '/spinAmountHistory'
                        },

                    ]
                },
                {
                    "id": 8,
                    "name": "Admin",
                    "isShow": false,
                    "icon": "fas fa-user-friends",
                    "rootMenu": ['/config'],
                    "subMenu": [
                        {
                            "id": 0,
                            "name": "Config",
                            "icon": "fas fa-user-friends",
                            "link": '/config'
                        },
                        // {
                        //     "id": 0,
                        //     "name": "Cache",
                        //     "icon": "fas fa-user-friends",
                        //     "link": '/cache'
                        // }
                    ]
                }
            ]
        }
    ];

    getRootPath() {
        const names = window.location.pathname.split("/");
        this.setState({link: "/" + names[1]});
        return "/" + names[1];
    }

    componentDidMount() {
        setTimeout(() => {
            this.getRootPath()
        })
    }

    toggle(i: any, item: any){
        item.isShow = !item.isShow
        if(item.isShow){
            $(`#icon_${i}`).removeClass('fa-angle-right')
            $(`#icon_${i}`).addClass('fa-angle-down')
        }else {
            $(`#icon_${i}`).removeClass('fa-angle-down')
            $(`#icon_${i}`).addClass('fa-angle-right')
        }

        $(`#dashboards_${i}`).slideToggle()
    }

    render() {
        if (loginStore.isProfile) {
            const role = RoleUser.ADMIN;
            const itemByRoles: any = this.data.filter((index: any) => {
                return (index.role === role)
            });

            return (
                <nav className="sidebar sidebar-offcanvas" id="sidebar">
                    <ul className="nav">
                        <li className="profile">
                            <Link to={`/profile`} className="profile-wrapper">

                                    <button type="button" className="btn btn-primary avatar btn-social-icon" style={{borderRadius: 12}}>
                                        {"ADMIN".slice(0, 1).toUpperCase()}
                                    </button>

                                <div className="profile-details">
                                    <p className="name">ADMIN</p>
                                    <small className="designation">ADMIN</small>
                                </div>
                            </Link>
                        </li>
                        {itemByRoles[0].menu.map((item: any, i: any) => {
                            let navItem = "nav-item active";
                            let collapse = "collapse ";
                            let text_active: any = '';
                            item.subMenu.map((child: any) => {
                                if (child.link === this.state.link || item.childMenu && child.childMenu.indexOf(this.state.link) >= 0) {
                                    item.isShow = true
                                    $(`#icon_${i}`).removeClass('fa-angle-right')
                                    $(`#icon_${i}`).addClass('fa-angle-down')
                                    collapse += "show"
                                    text_active = "text-white"
                                }
                            })
                            return (
                                <li className={navItem} key={i}>
                                    {item.linkRouter ?
                                        <Link to={item.linkRouter} className="nav-link w-100 d-flex justify-content-between align-items-center">
                                            <span className="menu-title">{item.name}</span>
                                            <i className="fal fa-angle-right" id={`icon_${i}`}/>
                                        </Link> : 
                                        <a className="nav-link w-100 d-flex justify-content-between align-items-center" onClick={() => this.toggle(i, item)}>
                                            <span className={`menu-title ${text_active}`}>{item.name}</span>
                                            <i className="fal fa-angle-right" id={`icon_${i}`}/>
                                        </a>
                                    }
                                    <div className={collapse} id={`dashboards_${i}`}>
                                        <ul className="nav flex-column sub-menu">
                                            {item.subMenu && item.subMenu.map((item: any, i: any) => {
                                                let navLink = "nav-link"
                                                if (item.link === this.state.link || item.childMenu && item.childMenu.indexOf(this.state.link) >= 0) {
                                                    navLink = "nav-link active"
                                                }
                                                if (item.link.indexOf("http") !== -1) {
                                                    return (
                                                        <li className="nav-item " key={i} onClick={(e: any) => {
                                                            this.getRootPath()
                                                        }}>
                                                            <a href={item.link} target="_blank" className={navLink}>{item.name}</a>
                                                        </li>
                                                    );
                                                } else {
                                                    return (
                                                        <li className="nav-item " key={i} onClick={(e: any) => {
                                                            this.getRootPath()
                                                        }}>
                                                            <Link to={item.link} className={navLink} href="#">{item.name}</Link>
                                                        </li>
                                                    )
                                                }
                                            })}
                                        </ul>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            );
        } else return true
    }
}

export default SideBar;
