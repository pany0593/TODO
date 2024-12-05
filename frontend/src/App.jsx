import './App.css';
import TopBar from './components/TopBar/TopBar.jsx';
import LeftPanel from './components/LeftPanel/LeftPanel.jsx';
import CalendarWeek from './components/CalendarWeek/CalendarWeek.jsx';

function App() {
    return (
        <div className="app">
            <TopBar />
            <div className="main-content">
                <LeftPanel />
                <div className="right-panel">
                    <CalendarWeek />
                </div>
            </div>
        </div>
    );
}

export default App;
