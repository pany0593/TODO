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
import { get_memos } from "../../api/memo.jsx";

function CalendarApp() {
    // 创建事件服务插件
    const eventsService = useState(() => createEventsServicePlugin())[0];

    // 创建日历应用，设置视图和插件
    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: [], // 初始为空，后续会更新
        plugins: [eventsService],
    });

    const [events, setEvents] = useState([]); // 用于存储事件

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

    useEffect(() => {
        const fetchMemos = async () => {
            try {
                const response = await get_memos(); // 获取备忘录
                const memos = response.data.memos; // 获取备忘录数组

                // 检查 memos 数据格式
                if (Array.isArray(memos)) {
                    // 格式化备忘录为日历事件
                    const formattedEvents = memos.map((memo) => ({
                        id: memo.task_id, // 使用 task_id 作为事件的唯一标识
                        title: memo.course_name, // 使用 course_name 作为事件标题
                        start: formatDate(memo.deadline), // 格式化为 YYYY-MM-DD HH:mm
                        end: formatDate(memo.deadline), // 格式化为 YYYY-MM-DD HH:mm
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
