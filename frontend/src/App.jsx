import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar.jsx';
import Home from './pages/Home/Home.jsx';
import User from './pages/User/User.jsx';
import Login from './pages/LoginRegister/Login.jsx';
import Register from './pages/LoginRegister/Register.jsx';

function App() {
    // 检查 localStorage 中是否存在 token
    const token = localStorage.getItem('token');

    return (
        <Router>
            <div className="app">
                <TopBar />
                <Routes>
                    {/* 根据 token 判断初始路由 */}
                    <Route path="/" element={token ? <Navigate to="/home" /> : <Navigate to="/login" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/user" element={token ? <Navigate to="/user" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
