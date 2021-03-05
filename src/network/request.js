import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { BASE_URL, TIMEOUT } from "./config";
import { getToken } from '@/utils'

const request = (config) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT
  });
  
  instance.interceptors.request.use(config => {
    
    // 1.发送网络请求时, 在界面的中间位置显示Loading的组件
    NProgress.start();
    // 2.某一些请求要求用户必须携带token, 如果没有携带, 那么直接跳转到登录页面
    if(!(config.url === "/admin/login")){
      const token = getToken()
      config.headers['token'] = token
    }
    // 3.params/data序列化的操作
  
    return config;
  }, err => {
  
  });
  
  instance.interceptors.response.use(res => {
    NProgress.done();
    return res.data;
  }, err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log("请求错误");
          break;
        case 401:
          console.log("未授权访问");
          break;
        default:
          console.log("其他错误信息");
      }
    }
    return err;
  });

  return instance(config);
}

export default request;

