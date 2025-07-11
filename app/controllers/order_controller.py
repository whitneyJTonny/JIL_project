from flask import Blueprint, request, jsonify
from app.models.order_model import Order
from app.extensions import db
from app.status_codes import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

order_bp = Blueprint('order', __name__, url_prefix='/api/v1/orders')

# GET all orders
@order_bp.route('/', methods=['GET'])
def get_all_orders():
    orders = Order.query.all()
    order_list = [{
        "orderID": o.orderID,
        "customerid": o.customerid,
        "order_date": o.order_date.isoformat() if o.order_date else None,
        "total_ammount": o.total_ammount,
        "payment_status": o.payment_staus,
        "delivery_status": o.delivery_status,
        "description": o.description
    } for o in orders]
    return jsonify(order_list), HTTP_200_OK

# GET a single order by ID
@order_bp.route('/<int:id>', methods=['GET'])
def get_order(id):
    o = Order.query.get(id)
    if not o:
        return jsonify({"message": "Order not found"}), HTTP_404_NOT_FOUND

    return jsonify({
        "orderID": o.orderID,
        "customerid": o.customerid,
        "order_date": o.order_date.isoformat() if o.order_date else None,
        "total_ammount": o.total_ammount,
        "payment_status": o.payment_staus,
        "delivery_status": o.delivery_status,
        "description": o.description
    }), HTTP_200_OK

# POST a new order
@order_bp.route('/', methods=['POST'])
def create_order():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

    required_fields = ['customerid', 'order_date', 'total_ammount', 'payment_status', 'delivery_status', 'description']
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"Missing field: {field}"}), HTTP_400_BAD_REQUEST

    try:
        new_order = Order(
            orderID=data.get('orderID'),  # Optional, usually auto-generated
            customerid=data['customerid'],
            order_date=data['order_date'],  # Make sure this is a date/datetime string or converted before insert
            total_ammount=data['total_ammount'],
            payment_status=data['payment_status'],
            delivery_status=data['delivery_status'],
            description=data['description']
        )
        db.session.add(new_order)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to create order", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Order created successfully", "order": {
        "orderID": new_order.orderID,
        "customerid": new_order.customerid,
        "order_date": new_order.order_date.isoformat() if new_order.order_date else None,
        "total_ammount": new_order.total_ammount,
        "payment_status": new_order.payment_staus,
        "delivery_status": new_order.delivery_status,
        "description": new_order.description
    }}), HTTP_201_CREATED

# PUT to update an order
@order_bp.route('/<int:id>', methods=['PUT'])
def update_order(id):
    o = Order.query.get(id)
    if not o:
        return jsonify({"message": "Order not found"}), HTTP_404_NOT_FOUND

    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

    o.customerid = data.get('customerid', o.customerid)
    o.order_date = data.get('order_date', o.order_date)
    o.total_ammount = data.get('total_ammount', o.total_ammount)
    o.payment_staus = data.get('payment_status', o.payment_staus)
    o.delivery_status = data.get('delivery_status', o.delivery_status)
    o.description = data.get('description', o.description)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to update order", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Order updated successfully", "order": {
        "orderID": o.orderID,
        "customerid": o.customerid,
        "order_date": o.order_date.isoformat() if o.order_date else None,
        "total_ammount": o.total_ammount,
        "payment_status": o.payment_staus,
        "delivery_status": o.delivery_status,
        "description": o.description
    }}), HTTP_200_OK

# DELETE an order
@order_bp.route('/<int:id>', methods=['DELETE'])
def delete_order(id):
    o = Order.query.get(id)
    if not o:
        return jsonify({"message": "Order not found"}), HTTP_404_NOT_FOUND

    try:
        db.session.delete(o)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to delete order", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Order deleted successfully"}), HTTP_200_OK
