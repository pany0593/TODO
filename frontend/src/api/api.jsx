
// 通用的请求函数
import axios from "axios";

export const apiRequest = async (url, method, data) => {
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