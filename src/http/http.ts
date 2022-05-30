import axios from "axios";
import router from '../router/index'
import { Toast } from '@nutui/nutui';

const baseURL = "http://127.0.0.1:9086/";
const requestTimeout = 10000;
const instance = axios.create({
    baseURL,
    timeout: requestTimeout,
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    }
});

instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    response => {
        const res = response.data;
        return res;
    },
    error => {
        const { response } = error;
        if (error.response.code) {
            switch (error.response.status) {
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。    
                case 401:
                    router.replace({
                        path: '/login',
                        // query: { 
                        //     redirect: router.currentRoute.fullPath 
                        // }
                    });
                    break;
                case 404:
                    Toast.text({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                default:
                    Toast.text({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
        }
        if (response && response.data) {
            return Promise.reject(error);
        } else {
            const { message } = error;
            console.log(message);
            return Promise.reject(error);
        }
    }
);

export default instance;

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        instance.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
    })    
});}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function post(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, JSON.stringify(params))
        .then(res => {
            if(res.code == 200) {
                resolve(res.data);
            } else {
                reject(res.data);
            }
            
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
