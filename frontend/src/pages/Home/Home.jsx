import { useState } from 'react';
import LeftPanel from '../../components/LeftPanel/LeftPanel.jsx';
import CalendarWeek from '../../components/CalendarWeek/CalendarWeek.jsx';
import AddMemo from "../../components/AddMemo/AddMemo.jsx";
import AddCourse from "../../components/AddCourse/AddCourse.jsx";
import {get_course} from "../../api/course.js";

function Home() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isCourseVisible, setCourseVisible] = useState(false);
    const [courses, setCourses] = useState([]);  // 用于存储课程数据
    const [loading, setLoading] = useState(true);  // 用于显示加载状态

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

    return (
        <div className="main-content">
            {isFormVisible && <AddMemo setFormVisible={setFormVisible} />}
            {isCourseVisible && <AddCourse setCourseVisible={setCourseVisible} fetchCourses={fetchCourses}/>}
            <LeftPanel
                setFormVisible={setFormVisible}
                setCourseVisible={setCourseVisible}
                courses={courses}
                setLoading={loading}
                fetchCourses={fetchCourses}
            />
            <div className="right-panel">
                <CalendarWeek />
            </div>
        </div>
    );
}

export default Home;
