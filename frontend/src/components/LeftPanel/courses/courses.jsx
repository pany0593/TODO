import { useEffect, useState } from "react";
import { get_course } from "../../../api/course";  // 假设 get_courses 函数从 api 中导入
import "./courses.css"

function Courses() {
    const [courses, setCourses] = useState([]);  // 用于存储课程数据
    const [loading, setLoading] = useState(true);  // 用于显示加载状态

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await get_course(); // 调用 API 获取课程数据
                const courseData = response.data; // 从响应中获取课程数据

                // 存储所有的课程名称到 localStorage
                const courseNames = courseData.map(course => course.course_name);
                localStorage.setItem("courseNames", JSON.stringify(courseNames));

                // 更新课程状态
                setCourses(courseData);
                setLoading(false); // 设置加载状态为 false
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                setLoading(false);
            }
        };

        fetchCourses();  // 执行获取课程的操作
    }, []);  // 空依赖数组，确保只在组件挂载时调用一次

    // 渲染加载中的状态
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="courses-container">
            <div className="courses-header">所有课程</div>
            {courses.map(course => (
                <div key={course.course_id} className="course-item">
                    <div className="course-name">{course.course_name}</div>
                </div>
            ))}
        </div>
    );
}

export default Courses;
