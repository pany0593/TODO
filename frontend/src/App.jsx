import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopBar from './components/TopBar/TopBar.jsx';
import Home from './pages/Home/Home.jsx';
import User from './pages/User/User.jsx';
import Login from './pages/LoginRegister/Login.jsx';
import Register from './pages/LoginRegister/Register.jsx';
// 受保护的路由组件
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
}

function App() {
    // // 检查 localStorage 中是否存在 token
    // const token = localStorage.getItem('token');

    return (
        <Router>
            <div className="app">
                <TopBar />
                <Routes>
                    {/* 根据 token 判断初始路由 */}
                    <Route path="/" element={<Navigate to="/home" />} />

                    {/* 受保护的路由 */}
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute>
                                <User />
                            </ProtectedRoute>
                        }
                    />

                    {/* 不需要保护的路由 */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
