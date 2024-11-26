from extensions import db


# 用户模型
class User(db.Model):
    __tablename__ = 'User'
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    registration_date = db.Column(db.DateTime, server_default=db.func.now())


# 课程模型
class Course(db.Model):
    __tablename__ = 'Course'
    course_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_name = db.Column(db.String(100), nullable=False)
    teacher_name = db.Column(db.String(50), nullable=False)


# 任务模型
class Task(db.Model):
    __tablename__ = 'Task'
    task_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey('Course.course_id'), nullable=False)
    status = db.Column(db.Enum('0', '1'), nullable=False)
    deadline = db.Column(db.Date, nullable=False)
    description = db.Column(db.Text, nullable=False)
