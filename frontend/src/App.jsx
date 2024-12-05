import './App.css';
import TopBar from './components/TopBar/TopBar.jsx';
import LeftPanel from './components/LeftPanel/LeftPanel.jsx';
import CalendarWeek from './components/CalendarWeek/CalendarWeek.jsx';
import AddMemo from "./components/AddMemo/AddMemo.jsx";
import {useState} from "react";

function App() {
    const [isFormVisible, setFormVisible] = useState(false); // 在父组件中管理状态

    return (
        <div className="app">
            <TopBar />
            {isFormVisible && <AddMemo setFormVisible={setFormVisible} />}
            <div className="main-content">
                <LeftPanel setFormVisible={setFormVisible} />
                <div className="right-panel">
                    <CalendarWeek />
                </div>
            </div>
        </div>
    );
}

export default App;
