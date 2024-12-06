import psycopg2
from models import User, db
import logging

logger = logging.getLogger(__name__)


def get_all_users():
    """
    获取所有用户信息
    :return: 用户列表，每个用户是一个字典
    """
    try:
        users = User.query.all()  # 查询所有用户
        return [{'user_id': user.user_id, 'username': user.username, 'email': user.email} for user in users]
    except Exception as e:
        print(f"Error fetching users: {e}")
        return []


def create_user(username, password, email):
    """
    创建一个新用户
    :param username: 用户名
    :param password: 密码
    :param email: 邮箱
    """
    try:
        new_user = User(username=username, password=password, email=email)
        db.session.add(new_user)  # 添加到数据库会话
        db.session.commit()  # 提交会话，保存更改
    except Exception as e:
        print(f"Error creating user: {e}")
        db.session.rollback()  # 回滚事务，防止数据库不一致
        raise


def create_conn():
    """
    获取数据库连接
    """
    try:
        conn = psycopg2.connect(
            dbname="db_test",
            user="test",
            password="***",
            host="***.***.***.***",
            port="26000"
        )
        return conn
    except Exception as e:
        logger.error(f"Unable to connect to the database: {e}")
        raise
