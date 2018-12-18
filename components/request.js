/**
 * Created by Smile on 201o/4/25.
 */
import axios from 'axios';
import {notification } from 'antd';

const instance = axios.create({
    baseURL: '/api',
});
instance.defaults.withCredentials=true
// instance.interceptors.request.use(
//     async config => {
//         console.log(Cookies.get('cookie1'));
//         return config;
//     },
//
// );
instance.interceptors.response.use(res =>{
    //对响应数据做些事
    // if(!res.data.success){
    //     return Promise.reject(res)
    // }
    // console.log(res['headers']['set-cookie']);
    const {headers: {'set-cookie': cookie}} = res;
    // console.log(cookie[0]);
    // console.log(Cookies.get('cookie1'))
    return res;
}, error => {
    if(error.response.status === 401) {
        // 401 说明 token 验证失败
        // 可以直接跳转到登录页面，重新登录获取 token
        history.push = '/login';
    } else if (error.response.status === 500) {
        // 服务器错误
        // do something
        return Promise.reject(error.response.data)
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.response.data)
});
export const aRequest = function (method, url, params) {
    return new Promise((resolve, reject) => {
        instance[method](url, params).then(response => {
            return response.data;
        }).then(data => {
            resolve(data.message);
            return ;
        }).catch(e => {
            console.log(e.message);
            notification['error']({
                message: '错误',
                description: e.message,
            });
            reject(e);
        })
    })
};