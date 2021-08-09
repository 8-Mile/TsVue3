// import Vue from 'vue'
import axios from 'axios'
// import routes from "./routes";
import qs from 'qs'
import merge from 'lodash/merge'
import { Message, Loading } from 'element-ui'
// import { clearLoginInfo } from '@/utils'
import store from '@/store'
const http = axios.create({
    timeout: 10000 * 10,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
})

const options = { lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' };
let loadingInstance;

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    var token = store.state.user.token;
    if (token) {
        config.headers['Token'] = token // 请求头带上token
    }
    loadingInstance = Loading.service(options);
    return config
}, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截
 */

http.interceptors.response.use(response => {
    loadingInstance.close();
    if (response.data && (response.data.code == 10100 || response.data.code == 10101)) { // 10100, token失效; 10101,被踢出
        return window.history.pushState({}, '', '/login');
    }
    return response
}, error => {
    loadingInstance.close();
    Message({
        type: 'error',
        message: '请求异常，请检查网络！'
    });
    return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
    // return window.SITE_CONFIG.baseUrl + actionName
    return process.env.VUE_APP_URL + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        // 't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'form') => {
    var defaults = {
        // 't': new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}


export default http
