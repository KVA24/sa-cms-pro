import React, {Component} from 'react';
import "./App.scss";
import {BrowserRouter as Router} from "react-router-dom"
import {observer} from "mobx-react";
import StorageService from "./common/service/StorageService";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {profileStore} from "./modules/profile/ProfileStore";
import Redirect from "./modules/router/router";
import Nav from './modules/layouts/Nav';
import SideBar from './modules/layouts/SideBar';
import {loginStore} from "./modules/authen/login/LoginStore";

@observer
export default class App extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        loginStore.isLogin = StorageService.isTokenExits();
        if(StorageService.isTokenExits()) {
            loginStore.isProfile = true
        }
    }

    render() {
        if(loginStore.isProfile) {
            return (
                <>
                    <Router>
                        <div className="container-scroller">
                            <Nav/>
                            <div className="container-fluid page-body-wrapper">
                                <SideBar/>
                                <div className="main-panel">
                                    <Redirect/>
                                </div>
                            </div>
                        </div>
                    </Router>
                    <ToastContainer/>
                </>
            );
        } else {
            return (
                <div>
                    <Router>
                        <Redirect/>
                    </Router>
                    <ToastContainer/>
                </div>
            );
        }
    }
}


