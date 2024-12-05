import { useState } from "react";
import './LoginRegister.css';

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("LoginRegister data:", formData);
        // 在此处添加登录逻辑，例如发送请求
    };

    return (
        <div className="auth-page">
            <h2>登录</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">用户名:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">密码:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">登录</button>
            </form>
            <p>
                没有账号？<a href="/register">注册</a>
            </p>
        </div>
    );
}

export default Login;
