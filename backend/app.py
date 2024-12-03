from flask import Flask
from flask_jwt_extended import JWTManager
from backend.controller import register_routes
from backend.utils import config


def create_app():
    """
    创建并配置 Flask 应用
    """
    app = Flask(__name__)
    app.config['JWT_SECRET_KEY'] = config['app']['secret_key']
    jwt = JWTManager(app)
    # 注册路由
    register_routes(app)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
