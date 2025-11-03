import axios from 'axios';

// 创建 axios 实例
const request = axios.create({
  baseURL: '/api', // 基础路径，与 Vite 代理配置匹配
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

export default request;