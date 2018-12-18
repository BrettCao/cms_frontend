/**
 * Created by Smile on 2018/4/12.
 */
import { observable, computed, action  } from 'mobx';
import 'babel-polyfill';
import axios from '../config/request';
export default class UserStore {
    constructor() {
        this.init();
    }
    @observable user = {};

    isLogin() {
       return new Promise((resolve, reject) => {
           axios.get('https://www.easy-mock.com/mock/5ad97e25d4f28375bcc4495a/zglwb/user').then(response=> {
               return response.data.message;
           }).then(data=> {
               resolve(data);
           }).catch( e=> {
               reject(e);
           })
       })
    }

    @action
    async init() {
        try {
            this.user = await this.isLogin();
        } catch (e) {
            console.log(e);
            throw new Error(e);
        }
    }
}