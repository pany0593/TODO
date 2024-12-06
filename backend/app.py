import datetime
from flask import Flask

from backend.controller import bp, jwt
from backend.utils import config
from flask_cors import CORS

"""
创建并配置 Flask 应用
"""
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = config['app']['secret_key']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=7)
app.config['JWT_TOKEN_LOCATION'] = ['headers']
jwt = jwt.init_app(app)
CORS(app)  # 启用跨域支持
# 注册路由
app.register_blueprint(bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
