import TopButton from './TopButton/TopButton';
import { Link } from 'react-router-dom'; // 引入 Link
import './TopBar.css';  // 引入 CSS 文件

function TopBar() {
    return (
        <div className="top-bar">
            <Link to="/" className="top-bar-title">
                TODO备忘录
            </Link>
            <div className="top-button">
                <TopButton />
            </div>
        </div>
    );
}

export default TopBar;
