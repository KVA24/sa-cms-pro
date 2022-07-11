import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withLogin } from '../requireLoginHoc/requireLoginHoc';
import { Redirect } from 'react-router';
import {loginStore} from "../authen/login/LoginStore";

@observer
class index extends Component {

    render() {
        if(loginStore.isProfile){
            return <Redirect to="/items"/>
        }else return true
    }
}

export default withLogin(index);