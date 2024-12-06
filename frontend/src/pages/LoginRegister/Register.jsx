import { useState } from "react";
import './LoginRegister.css';
import {login, register} from "../../api/auth.jsx";
import {useNavigate} from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({ username: "", password: "", email: "" });
    const navigate = useNavigate(); // 使用 useNavigate 获取 navigate 函数

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 调用 login 函数并传递用户名和密码
            let response = await register(formData.username, formData.password, formData.email);
            console.log('注册成功:', response);
            localStorage.setItem('userid', response.userid);

            // 调用 login 函数并传递用户名和密码
            response = await login(formData.username, formData.password);
            // 登录成功后，保存 token 到 localStorage
            localStorage.setItem('token', response.token);
            // 使用 navigate 跳转到首页
            navigate('/home'); // 使用 navigate 代替 history.push
        } catch (error) {
            console.error('注册失败:', error);
        }
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
