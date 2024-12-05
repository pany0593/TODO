import TopButton from './TopButton/TopButton';
import './TopBar.css';  // 引入 CSS 文件

function TopBar() {
    return (
        <div className="top-bar">
            <h2>TODO备忘录</h2>
            <div className="top-button">
                <TopButton />
            </div>
        </div>
    );
}

export default TopBar;
