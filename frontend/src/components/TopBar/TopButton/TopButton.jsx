import { Link } from 'react-router-dom';
import './TopButton.css';  // 引入外部CSS文件

function TopButton() {
    // 获取 user_name 从 localStorage
    const userName = localStorage.getItem('user_name');
    const displayName = userName ? userName.substring(0, 4) : 'User';  // 获取前四个字符，若没有 user_name 则显示默认 'User'

    return (
        <div className="nav-buttons">
            <Link to="/user" className="top-button">
                {displayName}
            </Link>
        </div>
    );
}

export default TopButton;
