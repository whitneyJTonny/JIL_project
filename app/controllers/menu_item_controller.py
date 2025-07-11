from flask import Blueprint, request, jsonify
from app.models.menu_item_model import MenuItem
from app.extensions import db
from app.status_codes import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_200_OK, HTTP_500_INTERNAL_SERVER_ERROR

menu_item_bp = Blueprint('menu_item', __name__, url_prefix='/api/v1/menu-items')

# GET all menu items
@menu_item_bp.route('/', methods=['GET'])
def get_all_menu_items():
    items = MenuItem.query.all()
    item_list = [{
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "category": item.category,
        "available": item.available
    } for item in items]
    return jsonify(item_list), HTTP_200_OK

# GET a single menu item by ID
@menu_item_bp.route('/<int:id>', methods=['GET'])
def get_menu_item(id):
    item = MenuItem.query.get(id)
    if item is None:
        return jsonify({"message": "Menu item not found"}), HTTP_404_NOT_FOUND
    return jsonify({
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "category": item.category,
        "available": item.available
    }), HTTP_200_OK

# POST a new menu item
@menu_item_bp.route('/', methods=['POST'])
def create_menu_item():
    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

    # Basic validation
    required_fields = ['name', 'price', 'category']
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"Missing field: {field}"}), HTTP_400_BAD_REQUEST

    try:
        new_item = MenuItem(
            name=data['name'],
            description=data.get('description', ''),
            price=data['price'],
            category=data['category'],
            available=data.get('available', True)
        )
        db.session.add(new_item)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to create menu item", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Menu item created successfully", "menu_item": {
        "id": new_item.id,
        "name": new_item.name,
        "description": new_item.description,
        "price": new_item.price,
        "category": new_item.category,
        "available": new_item.available
    }}), HTTP_201_CREATED

# PUT to update a menu item
@menu_item_bp.route('/<int:id>', methods=['PUT'])
def update_menu_item(id):
    item = MenuItem.query.get(id)
    if item is None:
        return jsonify({"message": "Menu item not found"}), HTTP_404_NOT_FOUND

    data = request.get_json()
    if not data:
        return jsonify({"message": "No input data provided"}), HTTP_400_BAD_REQUEST

    # Update fields if provided, else keep existing
    item.name = data.get('name', item.name)
    item.description = data.get('description', item.description)
    item.price = data.get('price', item.price)
    item.category = data.get('category', item.category)
    item.available = data.get('available', item.available)

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to update menu item", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Menu item updated successfully", "menu_item": {
        "id": item.id,
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "category": item.category,
        "available": item.available
    }}), HTTP_200_OK

# DELETE a menu item
@menu_item_bp.route('/<int:id>', methods=['DELETE'])
def delete_menu_item(id):
    item = MenuItem.query.get(id)
    if item is None:
        return jsonify({"message": "Menu item not found"}), HTTP_404_NOT_FOUND

    try:
        db.session.delete(item)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Failed to delete menu item", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR

    return jsonify({"message": "Menu item deleted successfully"}), HTTP_200_OK
