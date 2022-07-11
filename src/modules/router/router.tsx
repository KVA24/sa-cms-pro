import React from 'react';
import {Route} from 'react-router-dom';
import LoginComponent from "../authen/login/LoginComponent";
import Role from '../role/index'
import Profile from "../profile/component/Profile";
import Config from "../config/Config";
import Popups from "../popups/Popups";
import Items from "../items/Items";
import RewardHistory from "../history/rewardHistory/RewardHistory";
import SpinHistory from "../history/spinHistory/SpinHistory";
import UserReward from "../history/userReward/UserReward";
import SpinAmountHistory from "../history/spinAmountHistory/SpinAmountHistory";

export default function Redirect() {
    return (
        <>
            <Route exact path="/"  component={Role} />
            <Route path={`/login`} component={LoginComponent}/>
            <Route path={`/profile`} component={Profile}/>
            <Route path={'/config'} component={Config}/>
            <Route path={'/popups'} component={Popups}/>
            <Route path={'/items'} component={Items}/>
            <Route path={'/rewardHistory'} component={RewardHistory}/>
            <Route path={'/spinHistory'} component={SpinHistory}/>
            <Route path={'/userReward'} component={UserReward}/>
            <Route path={'/spinAmountHistory'} component={SpinAmountHistory}/>
        </>
    )
}
