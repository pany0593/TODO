import { apiRequest } from "./api.jsx";


// 注册请求函数
export const get_course = async () => {
    return await apiRequest('http://127.0.0.1:5000/api/courses', 'get', null, true);
};