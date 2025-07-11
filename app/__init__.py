from flask import Flask
from app.extensions import db, migrate, jwt
from app.models.user_model import User
from app.models.customer_model import Customer
from app.models.catering_event_model import CateringEvent
from app.models.delivery_model import Delivery
from app.models.order_model import Order
from app.models.menu_item_model import MenuItem
from app.models.order_model import Order
from app.models.staff_model import Staff
from app.models.vehicle_model import Vehicle
from flask_jwt_extended import JWTManager
from app.status_codes import (
    HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST,
    HTTP_401_UNAUTHORIZED, HTTP_409_CONFLICT, HTTP_500_INTERNAL_SERVER_ERROR
)


def create_app():
    # Initialize Flask application
    app = Flask(__name__)

    # Load configuration from config.py
    app.config.from_object('app.config.Config')

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # Register blueprints
    from app.controllers.auth.auth_controller import auth
    from app.controllers.user_controller import user_bp
    from app.controllers.customer_controllers import customer_bp
    from app.controllers.catering_event_controller import catering_event_bp
    from app.controllers.delivery_controller import delivery_bp
    from app.controllers.menu_item_controller import menu_item_bp
    from app.controllers.staff_controller import staff_bp
    from app.controllers.vehicle_controller import vehicle_bp
    from app.controllers.order_controller import order_bp
    from app.controllers.order_item_controller import order_item_bp
    app.register_blueprint(auth)
    app.register_blueprint(user_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(catering_event_bp)
    app.register_blueprint(delivery_bp)
    app.register_blueprint(menu_item_bp)
    app.register_blueprint(staff_bp)
    app.register_blueprint(vehicle_bp)
    app.register_blueprint(order_bp)
    app.register_blueprint(order_item_bp)

    # Health check route
    @app.route('/')
    def index():
        return '<h1><i>Welcome To Jesus Is Lord Eatery API</i></h1>'

    return app

