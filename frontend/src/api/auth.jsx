import axios from 'axios';

// 登录请求函数
export const login = async (username, password) => {
    const data = JSON.stringify({
        username: username,
        password: password
    });

    const config = {
        method: 'post',
        url: 'http://127.0.0.1:5000/api/login',
        headers: {
            // 'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response.data; // 返回登录后的用户数据
    } catch (error) {
        console.error('登录请求失败:', error);
        throw error; // 如果发生错误，抛出异常
    }
};
