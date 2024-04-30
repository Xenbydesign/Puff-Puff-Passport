from . import db


class CannaGear(db.Model):
    __tablename__ = "canna_gear"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    gear_type = db.Column(db.String)
    brand = db.Column(db.String)
    model = db.Column(db.String)
    purchase_date = db.Column(db.String)
    price = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    pic = db.Column(db.String)
    notes = db.Column(db.String)
    visible = db.Column(db.Boolean, default=True)

    user = db.relationship("User", back_populates="cannagear")

    def __repr__(self):
        return f"""
            <CannaGear #{self.id}:
                User_id: {self.user_id}
                Gear_type: {self.gear_type}
                Brand: {self.brand}
                Model: {self.model}
                Purchase_date: {self.purchase_date}
                Price: {self.price}
                Rating: {self.rating}
                Pic: {self.pic}
                Notes: {self.notes}
            />
        """
