import { useState } from "react";
import './AddMemo.css';
import {add_memo} from "../../api/memo.jsx";


function AddMemo({ setFormVisible }) {
    const [formData, setFormData] = useState({
        course: "",
        start: "",
        end: "",
        title: "",
        description: ""
    });

    // 处理表单输入变化
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // 关闭表单的逻辑
    const handleClose = () => {
        setFormVisible(false); // 设置父组件的状态为false，隐藏AddMemo组件
    };
    // 处理表单提交
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 调用 login 函数并传递用户名和密码
            const response = await add_memo(formData.course, formData.start, formData.end, formData.title, formData.description);
            console.log('添加成功:', response);
            // 登录成功后，保存 token 到 localStorage
            localStorage.setItem('memo_id', response.memo_id);
            setFormVisible(false); // 设置父组件的状态为false，隐藏AddMemo组件
        } catch (error) {
            console.error('添加失败:', error);
        }
    };

    return (
        <div className="form-container">
            <button className="close-button" onClick={handleClose}>×</button>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="course">course name:</label>
                    <input
                        type="text"
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="start">Start Time:</label>
                    <input
                        type="datetime-local"
                        id="start"
                        name="start"
                        value={formData.start}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="end">End Time:</label>
                    <input
                        type="datetime-local"
                        id="end"
                        name="end"
                        value={formData.end}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Event Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        cols="40"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add Event</button>
            </form>
        </div>
    );
}

export default AddMemo;
