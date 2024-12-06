import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 导入 useNavigate
import "./User.css";

function User() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        oldpassword: "",
        newpassword: ""
    });

    const navigate = useNavigate(); // 获取 navigate 函数用于跳转

    // 处理表单输入变化
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 处理表单提交
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("表单提交的数据:", formData);
        // 你可以在这里发送数据到服务器
    };

    // 处理退出账户
    const handleLogout = () => {
        // 清除 localStorage 中的用户数据（比如 token）
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
        console.log("用户已退出账户");
        // 跳转到登录页面
        navigate('/login');
    };

    return (
        <div className="user-page">
            <div className="user-header">
                <img
                    src="https://via.placeholder.com/150"
                    alt="用户头像"
                    className="user-avatar"
                />
                <h1>user_id</h1>
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
