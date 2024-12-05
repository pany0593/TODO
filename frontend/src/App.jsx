import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar.jsx';
import Home from './pages/Home/Home.jsx';
import User from './pages/User/User.jsx';

function App() {
    return (
        <Router>
            <div className="app">
                <TopBar />
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} /> {/* 重定向 */}
                    <Route path="/home" element={<Home />} />
                    <Route path="/user" element={<User />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
