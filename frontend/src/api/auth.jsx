import {apiRequest} from "./api.jsx";

// 登录请求函数
export const get_user = async () => {
    return await apiRequest('http://127.0.0.1:5000/api/get_user', 'get', null, true);
};
// 注册请求函数
export const register = async (username, password, email) => {
    const data = {
        username: username,
        password: password,
        email: email
    };
    return await apiRequest('http://127.0.0.1:5000/api/register', 'post', data, false);
};

// 登录请求函数
export const login = async (username, password) => {
    const data = {
        username: username,
        password: password
    };
    return await apiRequest('http://127.0.0.1:5000/api/login', 'post', data, false);
};
