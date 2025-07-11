from flask import Blueprint, request, jsonify
from app.models.user_model import User
from app.extensions import db

user_bp = Blueprint('user_bp', __name__, url_prefix="/api/v1/users")

# GET all users
@user_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    user_data = [
        {
            "id": user.id,
            "full_name": user.full_name,
            "contact": user.contact,
            "email": user.email,
            "address": user.address,
            # "customer_type": user.customer_type,
            "description": user.description
        } for user in users
    ]
    return jsonify(user_data), 200

# GET a single user by ID
@user_bp.route('/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "full_name": user.full_name,
        "contact": user.contact,
        "email": user.email,
        "address": user.address,
        # "customer_type": user.customer_type,
        "description": user.description
    }), 200

# POST a new user
@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), 400
    try:
        new_user = User(
            full_name=data['full_name'],
            contact=data['contact'],
            email=data['email'],
            address=data.get('address'),
            # customer_type=data.get('customer_type', 'individual'),
            description=data.get('description', '')
        )
        db.session.add(new_user)
        db.session.commit()
    except KeyError as e:
        return jsonify({"message": f"Missing required field {e}"}), 400

    return jsonify({
        "message": "User created successfully",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "contact": new_user.contact,
            "email": new_user.email,
            "address": new_user.address,
            # "customer_type": new_user.customer_type,
            "description": new_user.description
        }
    }), 201

# PUT update existing user
@user_bp.route('/<int:id>', methods=['PUT'])
def update_user(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({"message": "User not found"}), 404

    data = request.get_js_
