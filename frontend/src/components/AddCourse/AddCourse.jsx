import{ useState } from "react";
import {add_course} from "../../api/course.js";

function AddCourse({ setCourseVisible }) {
    const [formData, setFormData] = useState({
        course_name: "",
        teacher_name:"",
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
        setCourseVisible(false); // 设置父组件的状态为false，隐藏AddMemo组件
    };
    // 处理表单提交
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 调用 login 函数并传递用户名和密码
            const response = await add_course(formData.course_name, formData.teacher_name);
            console.log('添加成功:', response);
            setCourseVisible(false); // 设置父组件的状态为false，隐藏AddMemo组件
        } catch (error) {
            console.error('添加失败:', error);
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

                <button type="submit">添加课程</button>
            </form>
        </div>
    );
}

export default AddCourse;
