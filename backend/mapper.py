import psycopg2
import logging

from backend.utils import config

logger = logging.getLogger(__name__)


def get_user(user_id):
    sql = "SELECT username, email FROM users WHERE user_id = %s;"
    params = (user_id,)
    result = execute_query(sql, params, fetch_one=True)
    logger.info(f"Checked existence of user_id<{user_id}>: {'Exists' if result else 'Not exists'}")
    return result


def update_password(user_id, password):
    sql = "UPDATE users SET password = %s WHERE user_id = %s RETURNING user_id;"
    params = (password, user_id)
    result = execute_query(sql, params, fetch_one=True, commit=True)
    print(result)
    logger.info(f"Updated user<{user_id}> : {'Success' if result else 'Failed'}")
    return result[0] if result else None


def update_user(user_id, username, email):
    sql = "UPDATE users SET username = %s, email = %s WHERE user_id = %s RETURNING user_id;"
    params = (username, email, user_id)
    result = execute_query(sql, params, fetch_one=True, commit=True)
    logger.info(f"Updated user<{user_id}> : {'Success' if result else 'Failed'}")
    return result[0] if result else None


def get_user_password_id(user_id: str) -> str:
    sql = "SELECT password FROM users WHERE user_id = %s;"
    params = (user_id,)
    result = execute_query(sql, params, fetch_one=True)
    logger.info(f"Checked existence of user_id<{user_id}>: {'Exists' if result else 'Not exists'}")
    return result[0]


def check_memo_exists_by_id(task_id):
    """
    检查指定的备忘录ID是否存在
    """
    sql = "SELECT 1 FROM task WHERE task_id = %s;"
    params = (task_id,)
    result = execute_query(sql, params, fetch_one=True)
    logger.info(f"Checked existence of task_id<{task_id}>: {'Exists' if result else 'Not exists'}")
    return result is not None


def check_course_exists_by_id(course_id):
    """
    检查指定的课程ID是否存在
    """
    sql = "SELECT 1 FROM course WHERE course_id = %s;"
    params = (course_id,)
    result = execute_query(sql, params, fetch_one=True)
    logger.info(f"Checked existence of course_id<{course_id}>: {'Exists' if result else 'Not exists'}")
    return result is not None


def get_courses_by_user(user_id):
    """
    获取用户的所有课程
    """
    sql = """
        SELECT course_id, course_name, teacher_name 
        FROM course 
        WHERE user_id = %s;
    """
    params = (user_id,)
    result = execute_query(sql, params, fetch_all=True)
    logger.info(f"Fetched courses for user<{user_id}>: {len(result) if result else 0} courses found")
    return result


def delete_course(course_id, user_id):
    """
    删除课程
    """
    sql = "DELETE FROM course WHERE course_id = %s AND user_id = %s RETURNING course_id;"
    params = (course_id, user_id)
    result = execute_query(sql, params, fetch_one=True, commit=True)
    logger.info(f"Deleted course<{course_id}> for user<{user_id}>: {'Success' if result else 'Failed'}")
    return result[0] if result else None


def update_course(course_id, user_id, course_name, teacher_name):
    """
    更新课程信息
    """
    sql = """
        UPDATE course 
        SET course_name = %s, teacher_name = %s 
        WHERE course_id = %s AND user_id = %s 
        RETURNING course_id;
    """
    params = (course_name, teacher_name, course_id, user_id)
    result = execute_query(sql, params, fetch_one=True, commit=True)
    logger.info(f"Updated course<{course_id}> for user<{user_id}>: {'Success' if result else 'Failed'}")
    return result[0] if result else None


def get_memos_by_user(user_id):
    """
    获取用户的所有备忘录，并包含课程名称
    """
    sql = """
        SELECT t.task_id, t.course_id, c.course_name, t.start_time, t.end_time, t.title, t.description 
        FROM task t
        JOIN course c ON t.course_id = c.course_id
        WHERE t.user_id = %s;
    """
    params = (user_id,)
    result = execute_query(sql, params, fetch_all=True)
    logger.info(f"Fetched memos for user<{user_id}>: {len(result) if result else 0} memos found")
    return result


def delete_memo(task_id, user_id):
    """
    删除备忘录
    """
    sql = "DELETE FROM task WHERE task_id = %s AND user_id = %s RETURNING task_id;"
    params = (task_id, user_id)
    result = execute_query(sql, params, fetch_one=True, commit=True)
    logger.info(f"Deleted memo<{task_id}> for user<{user_id}>: {'Success' if result else 'Failed'}")
    return result[0] if result else None


def update_memo(task_id, user_id, course_id, status, deadline, description):
    """
    更新备忘录信息
    """
    sql = """
        UPDATE task 
        SET course_id = %s, status = %s, deadline = %s, description = %s 
        WHERE task_id = %s AND user_id = %s 
        RETURNING task_id;
    """
    params = (course_id, status, deadline, description, task_id, user_id)
    result = execute_query(sql, params, fetch_one=True, commit=True)
    logger.info(f"Updated memo<{task_id}> for user<{user_id}>: {'Success' if result else 'Failed'}")
    return result[0] if result else None


def get_course_id(course_name):
    sql = "SELECT course_id FROM course WHERE course_name = %s;"
    params = (course_name,)
    result = execute_query(sql, params, fetch_one=True)
    logger.info(f"Checked existence of course_name<{course_name}>: {'Exists' if result else 'Not exists'}")
    return result[0]


def insert_new_memo(memo_id, user_id, course_id, start, end, title, description):
    sql = "INSERT INTO task (task_id, user_id, course_id, start_time, end_time, title, description) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING task_id;"
    params = (memo_id, user_id, course_id, start, end, title, description)
    result = execute_query(sql, params, fetch_one=True, commit=True)
    logger.info(
        f"Inserted new memo<{description}> with user<{user_id}>. Task ID: {result[0] if result else 'Unknown'}")
    return result[0] if result else None


def check_memo_exists(course_id, deadline, description):
    sql = "SELECT 1 FROM task WHERE course_id = %s and deadline = %s and description = %s;"
    params = (course_id, deadline, description)
    result = execute_query(sql, params, fetch_one=True)
    logger.info(
        f"Checked existence of memo<{course_id, deadline, description}>: {'Exists' if result else 'Not exists'}")
    return result is not None


def insert_new_course(course_id, userid, course_name, teacher_name):
    sql = "INSERT INTO course (course_id, user_id, course_name, teacher_name) VALUES (%s, %s, %s, %s) RETURNING course_id;"
    params = (course_id, userid, course_name, teacher_name)
    result = execute_query(sql, params, fetch_one=True, commit=True)
    logger.info(
        f"Inserted new course<{course_name}> with user<{userid}>. Course ID: {result[0] if result else 'Unknown'}")
    return result[0] if result else None


def check_coursename_exists(user_id, course_name):
    sql = "SELECT 1 FROM course WHERE course_name = %s and user_id = %s;"
    params = (course_name, user_id)
    result = execute_query(sql, params, fetch_one=True)
    logger.info(f"Checked existence of course_name<{course_name}>: {'Exists' if result else 'Not exists'}")
    return result is not None


def get_user_id(username: str) -> str:
    sql = "SELECT user_id FROM users WHERE username = %s;"
    params = (username,)
    result = execute_query(sql, params, fetch_one=True)
    logger.info(f"Checked existence of username<{username}>: {'Exists' if result else 'Not exists'}")
    return result[0]


def get_user_password(username: str) -> str:
    sql = "SELECT password FROM users WHERE username = %s;"
    params = (username,)
    result = execute_query(sql, params, fetch_one=True)
    logger.info(f"Checked existence of username<{username}>: {'Exists' if result else 'Not exists'}")
    return result[0]


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
