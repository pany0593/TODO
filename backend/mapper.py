import psycopg2
import logging

from backend.utils import config

logger = logging.getLogger(__name__)


def insert_new_user(userid: str, username: str, password: str, email: str) -> int:
    """Insert a new user into the database.

    Args:
        userid (str): The ID of the new user.
        username (str): The username of the new user.
        password (str): The password of the new user.
        email (str): The email of the new user.

    Returns:
        int: The ID of the inserted user.
    """
    conn = create_conn()  # 创建数据库连接
    try:
        sql = "insert into users (user_id,username, password, email) values (%s,%s, %s, %s) RETURNING user_id;"  # 固定表名，防止动态 SQL 引发问题
        with conn.cursor() as cursor:
            cursor.execute(sql, (userid, username, password, email))  # 参数化查询防止 SQL 注入
            result = cursor.fetchone()  # 获取插入的用户 ID
            conn.commit()  # 提交事务
            logger.info(
                f"Inserted new user<{username}> with email<{email}>. User ID: {result[0] if result else 'Unknown'}")
        return result[0] if result else None  # 返回插入的用户 ID
    except Exception as e:
        conn.rollback()  # 如果发生异常，回滚事务
        logger.error(f"Failed to insert user<{username}>: {e}")
        raise
    finally:
        conn.close()  # 确保数据库连接被关闭


def check_username_exists(username: str) -> bool:
    """
    检查用户名是否存在
    Args:
        username (str): The username to check.

    Returns:
        bool: True if the username exists, False otherwise.
    """
    conn = create_conn()  # 创建数据库连接
    try:
        sql = "select 1 from users where username = %s;"  # 使用固定表名，避免不必要的动态 SQL
        with conn.cursor() as cursor:
            cursor.execute(sql, (username,))  # 传递参数以防止 SQL 注入
            result = cursor.fetchone()  # 检查是否有匹配的记录
            logger.info(f"Checked existence of username<{username}>: {'Exists' if result else 'Not exists'}")
        return result is not None  # 如果找到记录则返回 True，否则返回 False
    except Exception as e:
        conn.rollback()  # 发生错误时回滚
        logger.error(f"An error occurred while checking username<{username}>: {e}")
        raise
    finally:
        conn.close()  # 确保数据库连接被关闭


def create_conn():
    """
    获取数据库连接
    """
    try:
        conn = psycopg2.connect(
            dbname=config['database']['database'],
            user=config['database']['username'],
            password=config['database']['password'],
            host=config['database']['url'],
            port=config['database']['port']
        )
        return conn
    except Exception as e:
        logger.error(f"Unable to connect to the database: {e}")
        raise


def init_database(file_path):
    """
    执行给定文件中的 SQL 脚本进行初始化
    """
    conn = create_conn()
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            sql = file.read()  # 读取 schema.sql 文件的内容

        with conn.cursor() as cursor:
            cursor.execute(sql)  # 执行 SQL 脚本
            conn.commit()  # 提交更改
        print(f"Schema from '{file_path}' executed successfully.")
    except Exception as e:
        conn.rollback()  # 发生错误时回滚
        print(f"An error occurred: {e}")
    finally:
        conn.close()  # 关闭连接


if __name__ == '__main__':
    init_database('schema.sql')  # 执行同目录下的 schema.sql 脚本
