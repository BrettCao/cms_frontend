/**
 * Created by Smile on 2018/4/25.
 */
import axios from 'axios';
import {history}  from './history';
const instance = axios.create();

// instance.interceptors.request.use(
//     async config => {
//         const res = await this.plugin.isLogin();
//         config.headers.Authorization = this.user.getAuthorization();
//         return config;
//     },
//     err => {
//         return Promise.reject(err);
//     }
// );
instance.interceptors.response.use(res =>{
    //对响应数据做些事
    // if(!res.data.success){
    //     return Promise.reject(res)
    // }
    return res
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
export default instance;