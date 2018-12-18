import React from 'react';

import {observable, action, computed} from 'mobx';


class Auth {
    @observable user_name = '';
    @observable isLogin = false;

    @action
    setLogin() {
        this.isLogin = true;
    }

    @computed
    get login() {
        return this.isLogin;
    }

    @action
    loginOut() {
        this.isLogin = false;
    }
}

export const auth = new Auth();