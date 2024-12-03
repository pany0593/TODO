from backend import mapper
from backend.utils import SnowflakeIDGenerator, hash_password
from backend.utils import config

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
    hashed_password = hash_password(password,config['app']['secret_key'])
    # 生成用户id
    userid = generator.generate_id()
    # 保存用户信息
    result = mapper.insert_new_user(userid, username, hashed_password, email)
    if result:
        return result
    else:
        raise ValueError('Failed to register user')


def login_user(username, password):
    """
    登录用户
    成功返回token
    否则返回None
    """
    try:
        new_user = User(username=username, password=password, email=email)
        db.session.add(new_user)  # 添加到数据库会话
        db.session.commit()  # 提交会话，保存更改
    except Exception as e:
        print(f"Error creating user: {e}")
        db.session.rollback()  # 回滚事务，防止数据库不一致
        raise
