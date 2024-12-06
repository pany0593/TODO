import { useState } from 'react';
import LeftPanel from '../../components/LeftPanel/LeftPanel.jsx';
import CalendarWeek from '../../components/CalendarWeek/CalendarWeek.jsx';
import AddMemo from "../../components/AddMemo/AddMemo.jsx";
import AddCourse from "../../components/AddCourse/AddCourse.jsx";

function Home() {
    const [isFormVisible, setFormVisible] = useState(false);
    const [isCourseVisible, setCourseVisible] = useState(false);

    return (
        <div className="main-content">
            {isFormVisible && <AddMemo setFormVisible={setFormVisible} />}
            {isCourseVisible && <AddCourse setCourseVisible={setCourseVisible} />}
            <LeftPanel setFormVisible={setFormVisible} setCourseVisible={setCourseVisible}/>
            <div className="right-panel">
                <CalendarWeek />
            </div>
        </div>
    );
}

export default Home;
