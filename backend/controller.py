from flask import Blueprint, request, jsonify
from backend import service
from flask_jwt_extended import jwt_required, get_jwt_identity

# 创建蓝图
bp = Blueprint('api', __name__)


@jwt_required()
@bp.route('/add_course', methods=['POST'])
def add_course():
    """
    添加课程
    """
    data = request.json
    if not data or not all(key in data for key in ['course_name', 'teacher_name']):
        return jsonify({'error': 'Missing required fields'}), 400
    user_id = get_jwt_identity()


@bp.route('/register', methods=['POST'])
def register():
    """
    注册用户
    """
    data = request.json
    if not data or not all(key in data for key in ['username', 'password', 'email']):
        return jsonify({'error': 'Missing required fields'}), 400
    try:
        userid = service.register_user(data['username'], data['password'], data['email'])
        return jsonify({'userid': userid}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/login', methods=['POST'])
def login():
    """
    用户登录
    """
    data = request.json
    if not data or not all(key in data for key in ['username', 'password']):
        return jsonify({'error': 'Missing username or password'}), 400

    try:
        token = service.login_user(data['username'], data['password'])
        if token:
            return jsonify({'message': 'Login successful', 'token': token}), 200
        else:
            return jsonify({'error': 'Invalid username or password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def register_routes(app):
    """
    注册路由
    """
    app.register_blueprint(bp, url_prefix='/api')
