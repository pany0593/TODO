import ButtonComponent from './ButtonComponent/ButtonComponent.jsx';
import CalendarMonth from './CalendarMonth/CalendarMonth.jsx';

function LeftPanel() {
    return (
        <div className="left-panel">
            <div className="button-section">
                <ButtonComponent />
            </div>
            <div className="calendar-section">
                <CalendarMonth />
            </div>
        </div>
    );
}

export default LeftPanel;
