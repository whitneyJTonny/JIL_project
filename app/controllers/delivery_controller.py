from flask import Blueprint, request, jsonify
from app.models.delivery_model import Delivery
from app.extensions import db
from app.status_codes import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

delivery_bp = Blueprint('delivery', __name__, url_prefix='/api/v1/deliveries')

# GET all deliveries
@delivery_bp.route('/', methods=['GET'])
def get_all_deliveries():
    deliveries = Delivery.query.all()
    delivery_list = [{
        "id": d.id,
        "order_id": d.order_id,
        "customer_id": d.customer_id,
        "delivery_address": d.delivery_address,
        "delivery_time": d.delivery_time,
        "status": d.status
    } for d in deliveries]
    return jsonify(delivery_list), HTTP_200_OK

# GET a single delivery by ID
@delivery_bp.route('/<int:id>', methods=['GET'])
def get_delivery(id):
    d = Delivery.query.get(id)
    if d is None:
        return jsonify({"message": "Delivery not found"}), HTTP_404_NOT_FOUND
    return jsonify({
        "id": d.id,
        "order_id": d.order_id,
        "customer_id": d.customer_id,
        "delivery_address": d.delivery_address,
        "delivery_time": d.delivery_time,
        "status": d.status
    }), HTTP_200_OK

# POST a new delivery
@delivery_bp.route('/', methods=['POST'])
def create_delivery():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

    required_fields = ['order_id', 'customer_id', 'delivery_address', 'delivery_time', 'status']
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"Missing field: {field}"}), HTTP_400_BAD_REQUEST

    try:
        new_delivery = Delivery(
            order_id=data['order_id'],
            customer_id=data['customer_id'],
            delivery_address=data['delivery_address'],
            delivery_time=data['delivery_time'],
            status=data['status']
        )
        db.session.add(new_delivery)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to create delivery", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Delivery created successfully", "delivery": {
        "id": new_delivery.id,
        "order_id": new_delivery.order_id,
        "customer_id": new_delivery.customer_id,
        "delivery_address": new_delivery.delivery_address,
        "delivery_time": new_delivery.delivery_time,
        "status": new_delivery.status
    }}), HTTP_201_CREATED

# PUT to update a delivery
@delivery_bp.route('/<int:id>', methods=['PUT'])
def update_delivery(id):
    d = Delivery.query.get(id)
    if d is None:
        return jsonify({"message": "Delivery not found"}), HTTP_404_NOT_FOUND

    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

    # Use get with fallback to current values for partial updates
    d.order_id = data.get('order_id', d.order_id)
    d.customer_id = data.get('customer_id', d.customer_id)
    d.delivery_address = data.get('delivery_address', d.delivery_address)
    d.delivery_time = data.get('delivery_time', d.delivery_time)
    d.status = data.get('status', d.status)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to update delivery", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Delivery updated successfully", "delivery": {
        "id": d.id,
        "order_id": d.order_id,
        "customer_id": d.customer_id,
        "delivery_address": d.delivery_address,
        "delivery_time": d.delivery_time,
        "status": d.status
    }}), HTTP_200_OK

# DELETE a delivery
@delivery_bp.route('/<int:id>', methods=['DELETE'])
def delete_delivery(id):
    d = Delivery.query.get(id)
    if d is None:
        return jsonify({"message": "Delivery not found"}), HTTP_404_NOT_FOUND

    try:
        db.session.delete(d)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to delete delivery", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Delivery deleted successfully"}), HTTP_200_OK
