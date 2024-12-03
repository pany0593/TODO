import psycopg2
import logging

from backend.utils import config

logger = logging.getLogger(__name__)


def insert_new_user(userid: str, username: str, password: str, email: str) -> int:
    """
    插入新用户到数据库。

    Args:
        userid (str): 用户 ID。
        username (str): 用户名。
        password (str): 密码。
        email (str): 邮箱。

    Returns:
        int: 插入用户的 ID。
    """
    sql = "INSERT INTO users (user_id, username, password, email) VALUES (%s, %s, %s, %s) RETURNING user_id;"
    params = (userid, username, password, email)
    result = execute_query(sql, params, fetch_one=True, commit=True)
    logger.info(f"Inserted new user<{username}> with email<{email}>. User ID: {result[0] if result else 'Unknown'}")
    return result[0] if result else None


def check_username_exists(username: str) -> bool:
    """
    检查用户名是否存在。

    Args:
        username (str): 要检查的用户名。

    Returns:
        bool: 用户名是否存在。
    """
    sql = "SELECT 1 FROM users WHERE username = %s;"
    params = (username,)
    result = execute_query(sql, params, fetch_one=True)
    logger.info(f"Checked existence of username<{username}>: {'Exists' if result else 'Not exists'}")
    return result is not None


def execute_query(sql: str, params: tuple = (), fetch_one: bool = False, fetch_all: bool = False,
                  commit: bool = False) -> any:
    """
    执行通用数据库查询。

    Args:
        sql (str): 要执行的 SQL 语句。
        params (tuple): SQL 语句的参数。
        fetch_one (bool): 是否只获取一条记录。
        fetch_all (bool): 是否获取所有记录。
        commit (bool): 是否需要提交事务（适用于增删改操作）。

    Returns:
        any: 查询结果（根据 fetch_one 和 fetch_all 决定返回格式）。
    """
    conn = create_conn()  # 创建数据库连接
    try:
        with conn.cursor() as cursor:
            cursor.execute(sql, params)  # 参数化查询，防止 SQL 注入
            if fetch_one:
                result = cursor.fetchone()
            elif fetch_all:
                result = cursor.fetchall()
            else:
                result = None

            if commit:
                conn.commit()  # 仅在需要时提交事务
            return result
    except Exception as e:
        if commit:  # 如果启用了事务，发生异常时回滚
            conn.rollback()
        logger.error(f"Database query failed: {e}")
        raise
    finally:
        conn.close()  # 确保关闭数据库连接


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
