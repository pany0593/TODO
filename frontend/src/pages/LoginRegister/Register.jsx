import { useState } from "react";
import './LoginRegister.css';

function Register() {
    const [formData, setFormData] = useState({ username: "", password: "", email: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Register data:", formData);
        // 在此处添加注册逻辑，例如发送请求
    };

    return (
        <div className="auth-page">
            <h2>注册</h2>
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
                    <label htmlFor="email">邮箱:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
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
                <button type="submit">注册</button>
            </form>
            <p>
                已有账号？<a href="/login">登录</a>
            </p>
        </div>
    );
}

export default Register;
