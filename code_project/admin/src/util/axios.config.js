
import axios from "axios";

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const { authorization } = response.headers
    authorization && localStorage.setItem("token", authorization)

    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const { status } = error.response
    if (status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
    }
    return Promise.reject(error);
});