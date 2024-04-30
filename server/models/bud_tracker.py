from . import db


class BudTracker(db.Model):
    __tablename__ = "bud_trackers"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    strain_id = db.Column(db.Integer, db.ForeignKey("strains.id"))
    grower = db.Column(db.String)
    dispensary = db.Column(db.String)
    purchase_date = db.Column(db.String)
    purchase_amount = db.Column(db.String)
    cost = db.Column(db.Integer)
    rating = db.Column(db.Integer)
    flavor = db.Column(db.String)
    pic = db.Column(db.String)
    my_effects = db.Column(db.String)
    in_stock = db.Column(db.Boolean, default=False)

    user = db.relationship("User", back_populates="bud")
    smoke_sessions = db.relationship("SmokeSession", back_populates="bud")
    strain = db.relationship("Strain", back_populates="bud")

    def __repr__(self):
        return f"""
            <BudTracker #{self.id}:
                User_id: {self.user_id}
                Strain_id: {self.strain_id}
                Dispensary: {self.dispensary}
                Purchase_date: {self.purchase_date}
                Purchase_amount: {self.purchase_amount}
                Cost: {self.cost}
                Rating:{self.rating}
                Flavor:{self.flavor}
                Pic:{self.pic}
                My_effects:{self.my_effects}
                In_stock:{self.in_stock}
            />
        """
