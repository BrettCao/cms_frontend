/**
 * Created by Smile on 2018/4/11.
 */
import React from 'react';

import { HashRouter, Route } from 'react-router-dom';

import IndexPage from '../components/Index';
import { Provider } from  'mobx-react';
import Store from '../store/Store';
import PeriodicalIndex from '../pages/Periodical/Index';
import MonographsIndex from '../pages/Monographs/Index';
import VariousIndex from '../pages/Various/Index';
import OnlineIndex from '../pages/Online/Index';
import PaperShow from '../pages/Paper/Index';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ShowPeriodical from '../pages/ShowPeriodical';
import OtherMedia from '../pages/OtherMedia';
import Member from '../pages/Member';
import Password from '../pages/Password';
import Mobile from '../pages/Mobile';

import {history} from '../config/history';
const IRoute = (
    <Provider history={history} store={new Store()}>
        <HashRouter >
            <div>
                <Route path="/" component={IndexPage} exact />
                <Route path="/periodical" exact component={PeriodicalIndex}/>
                <Route path="/monographs" exact component={MonographsIndex}/>
                <Route path="/online" exact component={OnlineIndex}/>
                <Route path="/various" exact component={VariousIndex}/>
                <Route path="/paper/:id" exact component={PaperShow}/>
                <Route path="/periodical/:id" component={ShowPeriodical}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>
                <Route path="/other" exact component={OtherMedia}/>
                <Route path="/member" exact component={Member}/>
                <Route path="/password" exact component={Password}/>
                <Route path="/mobile" exact component={Mobile}/>
            </div>
        </HashRouter>
    </Provider>
);

export default IRoute;