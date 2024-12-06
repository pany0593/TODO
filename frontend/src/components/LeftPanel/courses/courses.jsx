import { useEffect } from "react";
import "./courses.css"

function Courses( {onClick, onCourseClick, courses, fetchCourses, setLoading} ) {



    useEffect(() => {
        fetchCourses();  // 执行获取课程的操作
    }, []);  // 空依赖数组，确保只在组件挂载时调用一次

    // 渲染加载中的状态
    if (setLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="courses-container">
            <button className="add-button" onClick={onClick}>+</button>
            <div className="courses-header">所有课程</div>
            {courses.map(course => (
                <div key={course.course_id} className="course-item"  onClick={onCourseClick}>
                    <div className="course-name">{course.course_name}</div>
                </div>
            ))}
        </div>
    );
}

export default Courses;
