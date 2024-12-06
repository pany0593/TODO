import {apiRequest} from "./api.jsx";


// 注册请求函数
export const add_memo = async (course, start, end, title, description) => {
    const data = {
        course_name: "test",
        status: 0,
        deadline: end,
        description: description
    };
    return await apiRequest('http://127.0.0.1:5000/api/add_memo', 'post', data, true);
};

export const get_memos = async () => {
    return await apiRequest('http://127.0.0.1:5000/api/memos', 'get', null, true);
};