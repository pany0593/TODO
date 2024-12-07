import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 导入 useNavigate
import "./User.css";
import {update_course} from "../../api/course.jsx";
import {update_user} from "../../api/auth.jsx";

function User() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        oldpassword: "",
        newpassword: ""
    });

    const navigate = useNavigate(); // 获取 navigate 函数用于跳转

    // 使用 useEffect 从 localStorage 获取初始数据
    useEffect(() => {
        const storedUsername = localStorage.getItem("user_name") || "";
        const storedEmail = localStorage.getItem("email") || "";
        setFormData({
            username: storedUsername,
            email: storedEmail,
            oldpassword: "",
            newpassword: ""
        });
    }, []); // 空数组确保只在组件挂载时调用一次

    // 处理表单输入变化
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 处理表单提交
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 调用 login 函数并传递用户名和密码
            const response = await update_user(formData.username, formData.email, formData.oldpassword, formData.newpassword);
            console.log('修改用户信息成功:', response);
            handleLogout();
        } catch (error) {
            alert(`修改失败: ${error.message}`);  // 显示错误信息
            console.error('修改失败:', error);  // 打印详细的错误对象
        }
    };

    // 处理退出账户
    const handleLogout = () => {
        // 清除 localStorage 中的用户数据（比如 token）
        localStorage.clear();
        console.log("用户已退出账户");
        // 跳转到登录页面
        navigate('/login');
    };

    return (
        <div className="user-page">
            <div className="user-header">
                {/* 头像更新为 avatar.jpg */}
                <div className="avatar-container">
                    <img
                        src="../../../public/default-avatar.jpg" // 更新头像路径
                        alt="用户头像"
                        className="user-avatar"
                    />
                </div>
                <h1>{formData.username}</h1> {/* 显示用户名 */}
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">用户名:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
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
                        />
                    </div>

                    <div className="password-container">
                        <h2>修改密码</h2>
                        <div className="form-group">
                            <label htmlFor="oldpassword">旧密码:</label>
                            <input
                                type="password"
                                id="oldpassword"
                                name="oldpassword"
                                value={formData.oldpassword}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newpassword">新密码:</label>
                            <input
                                type="password"
                                id="newpassword"
                                name="newpassword"
                                value={formData.newpassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button type="submit">保存修改</button>
                </form>
            </div>

            {/* 退出账户按钮 */}
            <div>
                <button
                    type="button"
                    className="logout-button-container"
                    onClick={handleLogout} // 调用 handleLogout 函数
                >
                    退出账户
                </button>
            </div>
        </div>
    );
}

export default User;
