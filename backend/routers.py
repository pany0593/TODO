from flask import Blueprint, request, jsonify
from interface import get_all_users, create_user

# 创建蓝图
bp = Blueprint('api', __name__)


@bp.route('/users', methods=['GET'])
def users():
    """
    获取所有用户
    """
    users = get_all_users()
    return jsonify(users)


@bp.route('/users', methods=['POST'])
def add_user():
    """
    添加用户
    """
    data = request.json
    create_user(data['username'], data['password'], data['email'])
    return jsonify({'message': 'User created successfully'}), 201


def register_routes(app):
    """
    注册路由
    """
    app.register_blueprint(bp, url_prefix='/api')
