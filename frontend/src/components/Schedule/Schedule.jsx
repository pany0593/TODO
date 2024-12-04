import React from "react";
import "./Schedule.css";

const Schedule = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="schedule">
            {days.map((day) => (
                <div className="day-column" key={day}>
                    <h3>{day}</h3>
                    {[...Array(24)].map((_, hour) => (
                        <div className="hour-block" key={hour}>
                            {hour}:00
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Schedule;
