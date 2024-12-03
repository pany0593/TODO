from flask import Flask
from backend.controller import register_routes


def create_app():
    """
    创建并配置 Flask 应用
    """
    app = Flask(__name__)
    # 注册路由
    register_routes(app)
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
