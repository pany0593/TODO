import ButtonComponent from './ButtonComponent/ButtonComponent.jsx';
import CalendarMonth from './CalendarMonth/CalendarMonth.jsx';
import Courses from "./courses/courses.jsx";
import './LeftPanel.css';

function LeftPanel({ setFormVisible, setCourseVisible, setSetCourseVisible, setSelectedCourse, courses, fetchCourses, setLoading }) {
    return (
        <div className="left-panel">
            <div className="button-section">
                <ButtonComponent onClick={() => setFormVisible(true)}/>
            </div>
            <div className="courses-section">
                <Courses
                    onClick={() => setCourseVisible(true)}
                    onCourseClick={() => setSetCourseVisible(true)}
                    setSelectedCourse={setSelectedCourse}
                    courses={courses}
                    fetchCourses={fetchCourses}
                    setLoading={setLoading}
                />
            </div>
            <div className="calendar-section">
                <CalendarMonth/>
            </div>
        </div>
    );
}

export default LeftPanel;
