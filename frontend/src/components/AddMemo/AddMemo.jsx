import { useState } from "react";
import './AddMemo.css';


function AddMemo({ setFormVisible }) {
    const [formData, setFormData] = useState({
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
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted:", formData);
        // 你可以在这里进行表单数据的处理或提交请求
    };

    return (
        <div className="form-container">
            <button className="close-button" onClick={handleClose}>×</button>
            <form onSubmit={handleSubmit}>
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
