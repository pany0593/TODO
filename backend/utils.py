import psycopg2

from interface import create_conn


def init_database(conn, file_path):
    """
    执行给定文件中的 SQL 脚本进行初始化
    """
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
    conn = create_conn()
    init_database(conn, 'schema.sql')  # 执行同目录下的 schema.sql 脚本
