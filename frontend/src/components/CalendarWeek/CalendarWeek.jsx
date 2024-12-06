import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';

import '@schedule-x/theme-default/dist/index.css';
import { useEffect, useState } from "react";

function CalendarApp({ fetchMemos, events }) {
    // 创建事件服务插件
    const eventsService = useState(() => createEventsServicePlugin())[0];

    // 创建日历应用，设置视图和插件
    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [], // 初始为空，后续会更新
        plugins: [eventsService],
    });

    useEffect(() => {
        fetchMemos(); // 获取备忘录并更新事件

    }, []); // 空依赖数组，确保只在组件挂载时调用一次

    useEffect(() => {
        // 当事件更新时，使用 eventsService.set 更新日历中的所有事件
        if (events.length > 0) {
            console.log("Updating events:", events); // 查看事件是否正确
            eventsService.set(events); // 设置所有事件
        }
    }, [events, eventsService]); // 当事件更新时，更新 eventsService

    return (
        <div>
            <ScheduleXCalendar calendarApp={calendar} />
        </div>
    );
}

export default CalendarApp;
