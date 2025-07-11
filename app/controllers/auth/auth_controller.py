from flask import Blueprint, request, jsonify
from app.models.user_model import User
from app.extensions import db, bcrypt
from flask_jwt_extended import JWTManager
import validators

from flask_jwt_extended import (
    create_access_token, create_refresh_token,
    jwt_required, get_jwt_identity
)
from app.status_codes import (
    HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED, HTTP_409_CONFLICT, HTTP_500_INTERNAL_SERVER_ERROR
)

auth = Blueprint("auth", __name__, url_prefix="/api/v1/auth")


def validate_registration_data(data):
    required_fields = ["full_name", "contact", "email", "password", "description"]
    missing = [field for field in required_fields if not data.get(field)]
    if missing:
        return f"Missing fields: {', '.join(missing)}"
    if not validators.email(data["email"]):
        return "Invalid email format"
    if len(data["password"]) < 8:
        return "Password must be at least 8 characters"
    return None


@auth.route("/register", methods=["GET", "POST"])
def register():
    data = request.get_json() or {}
    error = validate_registration_data(data)
    if error:
        return jsonify({"error": error}), HTTP_400_BAD_REQUEST

    email = data["email"]
    contact = data["contact"]

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), HTTP_409_CONFLICT
    if User.query.filter_by(contact=contact).first():
        return jsonify({"error": "Contact already in use"}), HTTP_409_CONFLICT

    try:
        hashed_password = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
        new_user = User(
            full_name=data["full_name"],
            contact=contact,
            email=email,
            address=data.get("address"),
            # customer_type=data.get("customer_type", "individual"),
            description=data["description"],
            password=hashed_password
        )
        db.session.add(new_user)
        db.session.commit()
        user_info = {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email,
            "contact": new_user.contact,
            "description": new_user.description
        }
        return jsonify({
            "message": f"{new_user.full_name} has been registered successfully.",
            "user": user_info
        }), HTTP_201_CREATED
    except Exception as e:
        db.session.rollback()
        # Log the exception for debugging
        print(f"Registration failed: {e}")
        return jsonify({"error": f"Registration failed: {str(e)}"}), HTTP_500_INTERNAL_SERVER_ERROR


@auth.route("/login", methods=["GET", "POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), HTTP_400_BAD_REQUEST

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), HTTP_401_UNAUTHORIZED

    access_token = create_access_token(identity=str(user.id))
    refresh_token = create_refresh_token(identity=str(user.id))
    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "refresh_token": refresh_token
    }), HTTP_200_OK


@auth.route("/token/refresh", methods=["GET", "POST"])
@jwt_required(refresh=True)
def refresh_token():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({
        "access_token": new_access_token
    }), HTTP_200_OK
    