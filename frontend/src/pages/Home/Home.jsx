import { useState } from 'react';
import LeftPanel from '../../components/LeftPanel/LeftPanel.jsx';
import CalendarWeek from '../../components/CalendarWeek/CalendarWeek.jsx';
import AddMemo from "../../components/AddMemo/AddMemo.jsx";

function Home() {
    const [isFormVisible, setFormVisible] = useState(false);

    return (
        <div className="main-content">
            {isFormVisible && <AddMemo setFormVisible={setFormVisible} />}
            <LeftPanel setFormVisible={setFormVisible} />
            <div className="right-panel">
                <CalendarWeek />
            </div>
        </div>
    );
}

export default Home;
