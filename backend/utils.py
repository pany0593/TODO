import time
import threading
import hashlib
import yaml


# 读取 YAML 配置文件
def load_config(file_path: str):
    with open(file_path, 'r', encoding='utf-8') as file:
        cfg = yaml.safe_load(file)  # 安全加载 YAML 配置
    return cfg


def hash_password(password: str, salt: str = "") -> str:
    """
    使用 SHA-256 加密密码
    Args:
        password (str): 明文密码
        salt (str): 可选的盐值

    Returns:
        str: 加密后的密码
    """
    # 将盐值与密码组合
    password_with_salt = (password + salt).encode('utf-8')
    # 使用 hashlib 生成 SHA-256 哈希值
    hashed_password = hashlib.sha256(password_with_salt).hexdigest()
    return hashed_password


class SnowflakeIDGenerator:
    def __init__(self, data_center_id: int, machine_id: int, epoch: int = 1609459200000):
        """
        初始化 Snowflake ID 生成器
        Args:
            data_center_id (int): 数据中心 ID（0~31）
            machine_id (int): 机器 ID（0~31）
            epoch (int): 开始时间戳（默认为 2021-01-01 00:00:00）
        """
        self.epoch = epoch
        self.data_center_id = data_center_id & 0x1F  # 限制为 5 位
        self.machine_id = machine_id & 0x1F  # 限制为 5 位
        self.sequence = 0
        self.last_timestamp = -1
        self.lock = threading.Lock()  # 保证线程安全

    def _current_timestamp(self):
        """获取当前时间戳（毫秒）"""
        return int(time.time() * 1000)

    def _wait_next_millis(self, last_timestamp):
        """等待下一毫秒"""
        timestamp = self._current_timestamp()
        while timestamp <= last_timestamp:
            timestamp = self._current_timestamp()
        return timestamp

    def generate_id(self):
        """生成唯一 ID"""
        with self.lock:
            timestamp = self._current_timestamp()
            if timestamp < self.last_timestamp:
                raise Exception("Clock moved backwards. Refusing to generate id")

            if timestamp == self.last_timestamp:
                self.sequence = (self.sequence + 1) & 0xFFF  # 序列号限制为 12 位
                if self.sequence == 0:
                    timestamp = self._wait_next_millis(self.last_timestamp)
            else:
                self.sequence = 0

            self.last_timestamp = timestamp

            # 计算 Snowflake ID
            snowflake_id = (
                    ((timestamp - self.epoch) << 22) |
                    (self.data_center_id << 17) |
                    (self.machine_id << 12) |
                    self.sequence
            )
            return snowflake_id


config = load_config("backend/config.yaml")
