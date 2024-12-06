import{ useState } from "react";

function AddCourse({ close }) {
    const [courseName, setCourseName] = useState("");
    const [teacherName, setTeacherName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // 在这里添加处理添加课程的逻辑
        console.log("Course added:", courseName, teacherName);
        close();  // 提交后关闭 AddCourse 组件
    };

    return (
        <div className="add-course-container">
            <div className="add-course-form">
                <h2>添加课程</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>课程名称</label>
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>教师名称</label>
                        <input
                            type="text"
                            value={teacherName}
                            onChange={(e) => setTeacherName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">提交</button>
                    <button type="button" onClick={close}>关闭</button>
                </form>
            </div>
        </div>
    );
}

export default AddCourse;
