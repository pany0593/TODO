import {apiRequest} from "./api.jsx";


// 注册请求函数
export const add_memo = async (course, start, end, title, description) => {
    const data = {
        course: course,
        start: start,
        end: end,
        title: title,
        description: description
    };
    return await apiRequest('http://127.0.0.1:5000/api/add_memo', 'post', data, true);
};

export const get_memos = async () => {
    return await apiRequest('http://127.0.0.1:5000/api/memos', 'get', null, true);
};
export const delete_memo = async (event_id) => {
    const data = {
        task_id: event_id
    };
    return await apiRequest('http://127.0.0.1:5000/api/memo', 'delete', data, true);
};