import{ useState } from "react";
import {delete_course, update_course} from "../../api/course.jsx";

function SetCourse({ setSetCourseVisible, selectedCourse, fetchCourses}) {
    const [formData, setFormData] = useState({
        course_name: selectedCourse ? selectedCourse.course_name : "",
        teacher_name: selectedCourse ? selectedCourse.teacher_name : "",
    });

    // 处理表单输入变化
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // 关闭表单的逻辑
    const handleClose = () => {
        setSetCourseVisible(false); // 设置父组件的状态为false，隐藏AddMemo组件
    };
    // 处理表单提交
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSetCourseVisible(false); // 设置父组件的状态为false，隐藏AddMemo组件
            // 调用 login 函数并传递用户名和密码
            const response = await update_course(selectedCourse.course_id,formData.course_name, formData.teacher_name);
            console.log('修改成功:', response);
            fetchCourses(); // 重新获取课程列表
        } catch (error) {
            console.error('修改失败:', error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            setSetCourseVisible(false); // 设置父组件的状态为false，隐藏AddMemo组件
            // 调用 login 函数并传递用户名和密码
            const response = await delete_course(selectedCourse.course_id);
            console.log('删除成功:', response);
            fetchCourses(); // 重新获取课程列表
        } catch (error) {
            console.error('删除失败:', error);
        }
    };



    return (
        <div className="form-container">
            <button className="close-button" onClick={handleClose}>×</button>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="course_name">课程名称</label>
                    <input
                        type="text"
                        id="course_name"
                        name="course_name"
                        value={formData.course_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="teacher_name">教师名称:</label>
                    <input
                        type="text"
                        id="teacher_name"
                        name="teacher_name"
                        value={formData.teacher_name}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">修改课程</button>
                <button type="submit" onClick={handleDelete}>删除课程</button>
            </form>
        </div>
    );
}

export default SetCourse;
