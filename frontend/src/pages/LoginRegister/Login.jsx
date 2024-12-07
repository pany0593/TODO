import { useState } from "react";
import './LoginRegister.css';
import {get_user, login} from "../../api/auth.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const navigate = useNavigate(); // 使用 useNavigate 获取 navigate 函数

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 调用 login 函数并传递用户名和密码
            let response = await login(formData.username, formData.password);
            console.log('登录成功:', response);
            // 登录成功后，保存 token 到 localStorage
            localStorage.setItem('token', response.token);
            // 使用 navigate 跳转到首页
            navigate('/home'); // 使用 navigate 代替 history.push
            response = await get_user();
            console.log('user_message:', response);
            localStorage.setItem('email',response.data.email);
            localStorage.setItem('user_id',response.data.user_id);
            localStorage.setItem('user_name',response.data.username);
        } catch (error) {
            if(error.response.status === 500){
                alert('用户名或密码错误');
            }
            else
                console.error('登录失败:', error);
        }
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
