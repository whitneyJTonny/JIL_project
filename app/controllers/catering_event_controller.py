from flask import Blueprint, request, jsonify
from app.models.catering_event_model import CateringEvent
from app.extensions import db
from app.status_codes import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND, HTTP_201_CREATED, HTTP_500_INTERNAL_SERVER_ERROR
from datetime import datetime

catering_event_bp = Blueprint('catering_event', __name__, url_prefix="/api/v1/catering-events")

@catering_event_bp.route('/', methods=['POST'])
def create_event():
    data = request.get_json()
    required_fields = ['customer_id', 'event_type', 'event_date', 'guest_count', 'location', 'total_cost']
    if not data or not all(field in data for field in required_fields):
        return jsonify({"message": "Missing required fields"}), HTTP_400_BAD_REQUEST
    
    try:
        # Validate event_date format (ISO 8601 string)
        event_date = datetime.fromisoformat(data['event_date'])
    except ValueError:
        return jsonify({"message": "Invalid date format for event_date"}), HTTP_400_BAD_REQUEST

    try:
        new_event = CateringEvent(
            customer_id=data['customer_id'],
            event_type=data['event_type'],
            event_date=event_date,
            guest_count=data['guest_count'],
            location=data['location'],
            total_cost=data['total_cost']
        )
        db.session.add(new_event)
        db.session.commit()
        return jsonify({"message": "Catering event created successfully", "event": {
            "id": new_event.id,
            "customer_id": new_event.customer_id,
            "event_type": new_event.event_type,
            "event_date": new_event.event_date.isoformat(),
            "guest_count": new_event.guest_count,
            "location": new_event.location,
            "total_cost": new_event.total_cost
        }}), HTTP_201_CREATED
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error creating event", "error": str(e)}), HTTP_500_INTERNAL_SERVER_ERROR
