from flask import Blueprint, request, jsonify
from app.models.order_item_model import OrderItem
from app.extensions import db
from app.status_codes import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

order_item_bp = Blueprint('order_item', __name__, url_prefix='/api/v1/order-items')

# GET all order items
@order_item_bp.route('/', methods=['GET'])
def get_all_order_items():
    items = OrderItem.query.all()
    result = [{
        "id": i.id,
        "order_id": i.orderID,
        "menu_item_id": i.menu_itemID,
        "quantity": i.quality,  # double check field name here from model!
        "subtotal": i.subtotal,
        "description": i.description
    } for i in items]
    return jsonify(result), HTTP_200_OK

# GET single order item by ID
@order_item_bp.route('/<int:id>', methods=['GET'])
def get_order_item(id):
    item = OrderItem.query.get(id)
    if not item:
        return jsonify({"message": "Order item not found"}), HTTP_404_NOT_FOUND
    return jsonify({
        "id": item.id,
        "order_id": item.orderID,
        "menu_item_id": item.menu_itemID,
        "quantity": item.quality,
        "subtotal": item.subtotal,
        "description": item.description
    }), HTTP_200_OK

# POST a new order item
@order_item_bp.route('/', methods=['POST'])
def create_order_item():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

    # Validate required fields
    required_fields = ['orderID', 'menu_itemID', 'quality', 'subtotal', 'description']
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"Missing field: {field}"}), HTTP_400_BAD_REQUEST

    try:
        new_item = OrderItem(
            orderID=data['orderID'],
            menu_itemID=data['menu_itemID'],
            quality=data['quality'],
            subtotal=data['subtotal'],
            description=data['description']
        )
        db.session.add(new_item)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Internal server error", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Order item created successfully", "order_item": {
        "id": new_item.id,
        "order_id": new_item.orderID,
        "menu_item_id": new_item.menu_itemID,
        "quantity": new_item.quality,
        "subtotal": new_item.subtotal,
        "description": new_item.description
    }}), HTTP_201_CREATED

# PUT to update order item
@order_item_bp.route('/<int:id>', methods=['PUT'])
def update_order_item(id):
    item = OrderItem.query.get(id)
    if not item:
        return jsonify({"message": "Order item not found"}), HTTP_404_NOT_FOUND

    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

    # Update fields if present
    item.orderID = data.get('orderID', item.orderID)
    item.menu_itemID = data.get('menu_itemID', item.menu_itemID)
    item.quality = data.get('quality', item.quality)
    item.subtotal = data.get('subtotal', item.subtotal)
    item.description = data.get('description', item.description)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Internal server error", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Order item updated successfully", "order_item": {
        "id": item.id,
        "order_id": item.orderID,
        "menu_item_id": item.menu_itemID,
        "quantity": item.quality,
        "subtotal": item.subtotal,
        "description": item.description
    }}), HTTP_200_OK

# DELETE order item
@order_item_bp.route('/<int:id>', methods=['DELETE'])
def delete_order_item(id):
    item = OrderItem.query.get(id)
    if not item:
        return jsonify({"message": "Order item not found"}), HTTP_404_NOT_FOUND

    try:
        db.session.delete(item)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Internal server error", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Order item deleted successfully"}), HTTP_200_OK
