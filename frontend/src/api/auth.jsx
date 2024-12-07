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
// 注册请求函数
export const update_user = async (username, email, oldpassword, newpassword) => {
    let userInfoResponse = null;
    if(username!==localStorage.getItem('username') && email!==localStorage.getItem('email')) {
        const udata = {
            username: username,
            email: email
        };
        userInfoResponse = await apiRequest('http://127.0.0.1:5000/api/update_user', 'post', udata, true);
    }
    if(newpassword && oldpassword){
        const pdata = {
            old_password: oldpassword,
            new_password: newpassword,
        };
        const passwordResponse = await apiRequest('http://127.0.0.1:5000/api/update_password', 'post', pdata, true);
        if(userInfoResponse !== null)
            return {userInfoResponse , passwordResponse,};
        else
            return passwordResponse;
    }
    if(userInfoResponse !== null)
        return userInfoResponse;
    else
        throw new Error('No changes made');
};

// 登录请求函数
export const login = async (username, password) => {
    const data = {
        username: username,
        password: password
    };
    return await apiRequest('http://127.0.0.1:5000/api/login', 'post', data, false);
};
