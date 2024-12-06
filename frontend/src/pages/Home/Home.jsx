import { useState } from 'react';
import LeftPanel from '../../components/LeftPanel/LeftPanel.jsx';
import CalendarWeek from '../../components/CalendarWeek/CalendarWeek.jsx';
import AddMemo from "../../components/AddMemo/AddMemo.jsx";
import AddCourse from "../../components/AddCourse/AddCourse.jsx";
import SetCourse from "../../components/SetCourse/SetCourse.jsx";
import {get_course} from "../../api/course.jsx";
import {get_memos} from "../../api/memo.jsx";

function Home() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isCourseVisible, setCourseVisible] = useState(false);
    const [isSetCourseVisible, setSetCourseVisible] = useState(false);
    const [courses, setCourses] = useState([]);  // 用于存储课程数据
    const [loading, setLoading] = useState(true);  // 用于显示加载状态
    const [events, setEvents] = useState([]); // 用于存储事件
    const [selectedCourse, setSelectedCourse] = useState(null); // To store selected course

    const handleSelectedCourse = (course) => {
        setSelectedCourse(course); // Set selected course when clicked
    };
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

    // 格式化时间为 YYYY-MM-DD HH:mm
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const fetchMemos = async () => {
        try {
            const response = await get_memos(); // 获取备忘录
            const memos = response.data.memos; // 获取备忘录数组

            // 检查 memos 数据格式
            if (Array.isArray(memos)) {
                // 格式化备忘录为日历事件
                const formattedEvents = memos.map((memo) => ({
                    id: memo.task_id, // 使用 task_id 作为事件的唯一标识
                    title: memo.title, // 使用 course_name 作为事件标题
                    start: formatDate(memo.start), // 格式化为 YYYY-MM-DD HH:mm
                    end: formatDate(memo.end), // 格式化为 YYYY-MM-DD HH:mm
                    description: memo.description, // 使用 description 作为事件描述
                }));
                // 更新事件状态
                setEvents(formattedEvents);
            } else {
                console.error('Invalid data format for memos:', memos);
            }
        } catch (error) {
            console.error('Failed to fetch memos:', error);
        }
    };


    return (
        <div className="main-content">
            {isFormVisible && <AddMemo setFormVisible={setFormVisible} fetchMemos={fetchMemos} courses={courses}/>}
            {isCourseVisible && <AddCourse setCourseVisible={setCourseVisible} fetchCourses={fetchCourses}/>}
            {isSetCourseVisible && <SetCourse setSetCourseVisible={setSetCourseVisible} selectedCourse={selectedCourse} fetchCourses={fetchCourses}/>}
            <LeftPanel
                setFormVisible={setFormVisible}
                setCourseVisible={setCourseVisible}
                setSetCourseVisible={setSetCourseVisible}
                setSelectedCourse={handleSelectedCourse}
                courses={courses}
                setLoading={loading}
                fetchCourses={fetchCourses}
            />
            <div className="right-panel">
                <CalendarWeek fetchMemos={fetchMemos} events={events}/>
            </div>
        </div>
    );
}

export default Home;
