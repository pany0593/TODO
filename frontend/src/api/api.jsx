// 通用的请求函数
import axios from "axios";

export const apiRequest = async (url, method, data, token = false) => {
    // 获取基础配置
    const config = {
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    };

    // 如果 token 参数为 true，则添加 Authorization 头
    if (token) {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            config.headers['Authorization'] = `Bearer ${storedToken}`;
        } else {
            console.error('未找到有效的令牌，请检查是否已登录或存储的令牌是否正确。');
            throw new Error('未找到有效的令牌');
        }
    }

    try {
        const response = await axios(config);
        return response.data; // 返回响应数据
    } catch (error) {
        console.error(`${method.toUpperCase()} 请求失败:`, error);
        throw error; // 如果发生错误，抛出异常
    }
};
