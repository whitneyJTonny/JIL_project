from flask import Blueprint, request, jsonify
from app.models.customer_model import Customer
from app.extensions import db, bcrypt
from app.status_codes import (
    HTTP_400_BAD_REQUEST,
    HTTP_409_CONFLICT,
    HTTP_500_INTERNAL_SERVER_ERROR,
    HTTP_201_CREATED,
)
import re

customer_bp = Blueprint('customer', __name__, url_prefix='/api/v1/customer')

def is_valid_email(email):
    # Basic regex for email validation
    regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(regex, email)

@customer_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided'}), HTTP_400_BAD_REQUEST

    full_name = data.get('full_name')
    contact = data.get('contact')
    email = data.get('email')
    password = data.get('password')
    biography = data.get('biography', '')

    # Required fields validation
    if not full_name or not contact or not email or not password:
        return jsonify({'error': 'All fields are required'}), HTTP_400_BAD_REQUEST

    if len(password) < 8:
        return jsonify({'error': 'Password must be at least 8 characters'}), HTTP_400_BAD_REQUEST

    if not is_valid_email(email):
        return jsonify({'error': 'Invalid email address'}), HTTP_400_BAD_REQUEST

    if Customer.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already in use'}), HTTP_409_CONFLICT

    if Customer.query.filter_by(contact=contact).first():
        return jsonify({'error': 'Contact already in use'}), HTTP_409_CONFLICT

    try:
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        customer = Customer(
            full_name=full_name,
            contact=contact,
            email=email,
            password=hashed_password,
            biography=biography
        )
        db.session.add(customer)
        db.session.commit()

        return jsonify({'message': f'{full_name} has been registered successfully'}), HTTP_201_CREATED

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
