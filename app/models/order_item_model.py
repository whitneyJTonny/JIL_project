from app.extensions import db

class OrderItem(db.Model):
    __tablename__ = "order_items"

    id = db.Column(db.Integer, primary_key=True, index=True)
    # order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False, index=True)
    # menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_items.id'), nullable=False, index=True)

    quantity = db.Column(db.Integer, nullable=False)
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)
    description = db.Column(db.String(255), nullable=True)

    # # Relationships
    # order = db.relationship('Order', back_populates='order_items')
    # menu_item = db.relationship('MenuItem', back_populates='order_items')

    def __init__(self, order_id, menu_item_id, quantity, subtotal, description=None):
        self.order_id = order_id
        self.menu_item_id = menu_item_id
        self.quantity = quantity
        self.subtotal = subtotal
        self.description = description
