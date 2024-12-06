import ButtonComponent from './ButtonComponent/ButtonComponent.jsx';
import CalendarMonth from './CalendarMonth/CalendarMonth.jsx';
import Courses from "./courses/courses.jsx";
import './LeftPanel.css';

function LeftPanel({ setFormVisible, setCourseVisible, setSetCourseVisible, courses, fetchCourses, setLoading }) {
    return (
        <div className="left-panel">
            <div className="button-section">
                <ButtonComponent onClick={() => setFormVisible(true)}/>
            </div>
            <div className="calendar-section">
                <CalendarMonth />
            </div>
            <div className="courses-section">
                <Courses
                    onClick={() => setCourseVisible(true)}
                    onCourseClick={() => setSetCourseVisible(true)}
                    courses={courses}
                    fetchCourses={fetchCourses}
                    setLoading={setLoading}
                />
            </div>
        </div>
    );
}

export default LeftPanel;
