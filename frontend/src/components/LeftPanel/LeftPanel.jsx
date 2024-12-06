import ButtonComponent from './ButtonComponent/ButtonComponent.jsx';
import CalendarMonth from './CalendarMonth/CalendarMonth.jsx';
import Courses from "./courses/courses.jsx";
import './LeftPanel.css';

function LeftPanel({ setFormVisible }) {
    return (
        <div className="left-panel">
            <div className="button-section">
                <ButtonComponent onClick={() => setFormVisible(true)}/>
            </div>
            <div className="calendar-section">
                <CalendarMonth />
            </div>
            <div className="courses-section">
                <Courses />
            </div>
        </div>
    );
}

export default LeftPanel;
