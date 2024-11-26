from flask import Flask
from backend.routers import register_routes
from extensions import db


def create_app():
    """
    创建并配置 Flask 应用
    """
    app = Flask(__name__)

    # 数据库配置：当前为 OpenGauss
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://test:TEST1215py@139.9.117.168:26000/db_test'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # 初始化扩展
    db.init_app(app)

    # 注册路由
    register_routes(app)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)
