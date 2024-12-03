from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from backend import service

# 创建蓝图
bp = Blueprint('api', __name__)
jwt = JWTManager()


@bp.route('/add_course', methods=['POST'])
@jwt_required()
def add_course():
    """
    添加课程
    """
    # try:
    #     # Manually verify JWT token
    #     verify_jwt_in_request()
    #     # If JWT is valid, proceed with your logic
    # except Exception as e:
    #     return jsonify(message="Token is invalid or missing"), 401

    data = request.json
    if not data or not all(key in data for key in ['course_name', 'teacher_name']):
        return jsonify({'error': 'Missing required fields'}), 400
    user_id = get_jwt_identity()
    try:
        course_id = service.add_course(user_id, data['course_name'], data['teacher_name'])
        return jsonify({'course_id': course_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


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
