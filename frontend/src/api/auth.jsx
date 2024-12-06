import axios from 'axios';

// 通用的请求函数
const apiRequest = async (url, method, data) => {
    const config = {
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    try {
        const response = await axios(config);
        return response.data; // 返回响应数据
    } catch (error) {
        console.error(`${method.toUpperCase()} 请求失败:`, error);
        throw error; // 如果发生错误，抛出异常
    }
};

// 注册请求函数
export const register = async (username, password, email) => {
    const data = {
        username: username,
        password: password,
        email: email
    };
    return await apiRequest('http://127.0.0.1:5000/api/register', 'post', data);
};

// 登录请求函数
export const login = async (username, password) => {
    const data = {
        username: username,
        password: password
    };
    return await apiRequest('http://127.0.0.1:5000/api/login', 'post', data);
};
