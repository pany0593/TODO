import { Link } from 'react-router-dom';
import './TopButton.css';  // 引入外部CSS文件

function TopButton() {
    return (
        <div className="nav-buttons">
            <Link to="/user" className="top-button">
                User
            </Link>
        </div>
    );
}

export default TopButton;
