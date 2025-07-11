from app.extensions import db
from datetime import datetime

class MenuItem(db.Model):
    __tablename__ = "menu_items"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, index=True)
    name = db.Column(db.String(255), nullable=False)
    category = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # # Relationship to OrderItem
    # order_items = db.relationship('OrderItem', back_populates='menu_item', lazy=True)

    def __init__(self, name, category, description=None):
        self.name = name
        self.category = category
        self.description = description
