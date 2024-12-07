import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';

import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from "react";;

function CalendarMonth() {
    const calendar = useCalendarApp({
        views: [createViewMonthGrid()]
    });

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}

export default CalendarMonth;
