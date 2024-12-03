from backend import mapper
from backend.utils import SnowflakeIDGenerator, hash_password
from backend.utils import config
from flask_jwt_extended import create_access_token, get_jwt_identity
import jwt
import datetime

# 初始化雪花算法
generator = SnowflakeIDGenerator(data_center_id=1, machine_id=1)


def register_user(username, password, email):
    """
    注册用户
    """
    # 检查用户名是否重复
    if mapper.check_username_exists(username):
        raise ValueError('Username already exists')
    # 加密密码
    hashed_password = hash_password(password, config['app']['secret_key'])
    # 生成用户id
    userid = generator.generate_id()
    # 保存用户信息
    result = mapper.insert_new_user(userid, username, hashed_password, email)
    if result:
        return result
    else:
        raise ValueError('Failed to register user')


def login_user(username: str, password: str) -> str:
    """
    登录用户并返回认证 token。

    Args:
        username (str): 用户名。
        password (str): 用户输入的密码。

    Returns:
        str: 生成的 JWT token，如果验证失败则抛出异常。
    """
    # 检查用户名是否存在
    if not mapper.check_username_exists(username):
        raise ValueError("Username does not exist.")

    # 哈希输入密码
    hashed_password = hash_password(password, config['app']['secret_key'])
    print(mapper.get_user_password(username))
    # 验证用户名和密码
    if hashed_password == mapper.get_user_password(username):
        # 用户验证通过，生成 JWT token
        token = create_access_token(identity=username)
        return token
    else:
        raise ValueError("Invalid username or password.")

