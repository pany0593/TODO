-- 创建用户表
CREATE TABLE users (
    user_id VARCHAR(50) PRIMARY KEY,         -- 用户ID，主键
    username VARCHAR(50) NOT NULL,                 -- 用户名
    password VARCHAR(255) NOT NULL,                -- 密码
    email VARCHAR(100) NOT NULL UNIQUE,            -- 邮箱，唯一
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- 注册时间
);

-- 创建课程表
CREATE TABLE course (
    course_id VARCHAR(50) PRIMARY KEY,      -- 课程ID，主键
    user_id INT NOT NULL,                         -- 用户ID，外键
    course_name VARCHAR(100) NOT NULL,             -- 课程名称
    teacher_name VARCHAR(50) NOT NULL,              -- 任课教师
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE, -- 关联用户表
);

-- 创建任务表
CREATE TABLE task (
    task_id VARCHAR(50) PRIMARY KEY,        -- 任务ID，主键
    user_id INT NOT NULL,                          -- 用户ID，外键
    course_id INT NOT NULL,                        -- 课程ID，外键
    status INT NOT NULL,                          -- 任务状态：待完成0/已完成1
    deadline DATE NOT NULL,                        -- 截止日期
    description TEXT NOT NULL,                     -- 任务描述
    FOREIGN KEY (course_id) REFERENCES Course(course_id) ON DELETE CASCADE -- 关联课程表
);
