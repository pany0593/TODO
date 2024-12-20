import { apiRequest } from "./api.jsx";


// 注册请求函数
export const add_course = async (course_name, teacher_name) => {
    const data = {
        course_name: course_name,
        teacher_name: teacher_name
    };
    return await apiRequest('http://127.0.0.1:5000/api/add_course', 'post', data, true);
};
// 注册请求函数
export const get_course = async () => {
    return await apiRequest('http://127.0.0.1:5000/api/courses', 'get', null, true);
};
export const update_course = async (course_id, course_name, teacher_name) => {
    const data = {
        course_id: course_id,
        course_name: course_name,
        teacher_name: teacher_name
    };
    return await apiRequest('http://127.0.0.1:5000/api/update_course', 'post', data, true);
};
export const delete_course = async (course_id) => {
    const data = {
        course_id: course_id,
    };
    return await apiRequest('http://127.0.0.1:5000/api/course', 'delete', data, true);
};