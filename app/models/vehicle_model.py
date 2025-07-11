from app.extensions import db

class Vehicle(db.Model):
    __tablename__ = "vehicles"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, index=True)
    vehicle_type = db.Column(db.String(255), nullable=False)
    plate_number = db.Column(db.String(255), nullable=False)
    # staff_id = db.Column(db.Integer, db.ForeignKey('staff.id'), unique=True, nullable=False)

    status = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String(255), nullable=True)

    # # Relationship
    # staff = db.relationship('Staff', back_populates='vehicle', uselist=False)

    def __init__(self, vehicle_type, plate_number, staff_id, status=None, description=None):
        self.vehicle_type = vehicle_type
        self.plate_number = plate_number
        self.staff_id = staff_id
        self.status = status
        self.description = description
