from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, JWTManager
from backend import service

# 创建蓝图
bp = Blueprint('api', __name__)
jwt = JWTManager()


@bp.route('/get_user', methods=['GET'])
@jwt_required()
def get_user():
    """
    获取所有备忘录
    """
    user_id = get_jwt_identity()
    try:
        data = service.get_user(user_id)
        return jsonify({'data': data}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/update_user', methods=['POST'])
@jwt_required()
def update_user():
    """
    修改课程
    """
    data = request.json
    if not data or not all(key in data for key in ['username', 'old_password', 'new_password', 'email']):
        return jsonify({'error': 'Missing required fields'}), 400
    user_id = get_jwt_identity()
    try:
        token = service.update_user(user_id, data['username'], data['old_password'], data['new_password'],
                                    data['email'])
        if token:
            return jsonify({'message': 'Update user successful', 'token': token}), 200
        else:
            return jsonify({'error': 'Invalid params'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/courses', methods=['GET'])
@jwt_required()
def get_courses():
    """
    获取所有课程
    """
    user_id = get_jwt_identity()
    try:
        courses = service.get_courses(user_id)
        return jsonify({'data': courses}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/course', methods=['DELETE'])
@jwt_required()
def delete_course():
    """
    删除课程
    """
    data = request.json
    if not data or 'course_id' not in data:
        return jsonify({'error': 'Missing course_id'}), 400
    user_id = get_jwt_identity()
    try:
        service.delete_course(user_id, data['course_id'])
        return jsonify({'message': 'Course deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/update_course', methods=['POST'])
@jwt_required()
def update_course():
    """
    修改课程
    """
    data = request.json
    if not data or not all(key in data for key in ['course_id', 'course_name', 'teacher_name']):
        return jsonify({'error': 'Missing required fields'}), 400
    user_id = get_jwt_identity()
    try:
        service.update_course(user_id, data['course_id'], data['course_name'], data['teacher_name'])
        return jsonify({'message': 'Course updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/memos', methods=['GET'])
@jwt_required()
def get_memo():
    """
    获取所有备忘录
    """
    user_id = get_jwt_identity()
    try:
        memos = service.get_memos(user_id)
        return jsonify({'data': memos}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/memo', methods=['DELETE'])
@jwt_required()
def delete_memo():
    """
    删除备忘录
    """
    data = request.json
    if not data or 'task_id' not in data:
        return jsonify({'error': 'Missing task_id'}), 400
    user_id = get_jwt_identity()
    try:
        service.delete_memo(user_id, data['task_id'])
        return jsonify({'message': 'Memo deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/update_memo', methods=['POST'])
@jwt_required()
def update_memo():
    """
    修改备忘录
    """
    data = request.json
    if not data or not all(key in data for key in ['task_id', 'course_name', 'status', 'deadline', 'description']):
        return jsonify({'error': 'Missing required fields'}), 400
    user_id = get_jwt_identity()
    try:
        service.update_memo(
            user_id,
            data['task_id'],
            data['course_name'],
            data['status'],
            data['deadline'],
            data['description']
        )
        return jsonify({'message': 'Memo updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/add_memo', methods=['POST'])
@jwt_required()
def add_memo():
    """
    添加备忘录
    """
    data = request.json
    if not data or not all(key in data for key in ['course', 'start', 'end', 'title', 'description']):
        return jsonify({'error': 'Missing required fields'}), 400
    user_id = get_jwt_identity()
    try:
        memo_id = service.add_memo(user_id, data['course'], data['start'], data['end'], data['title'], data['description'])
        return jsonify({'memo_id': memo_id}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@bp.route('/add_course', methods=['POST'])
@jwt_required()
def add_course():
    """
    添加课程
    """
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
