from . import db


class SmokeSession(db.Model):
    __tablename__ = "smoke_sessions"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    bud_id = db.Column(db.Integer, db.ForeignKey("bud_trackers.id"))
    date = db.Column(db.String)
    start_time = db.Column(db.String)
    end_time = db.Column(db.String)
    location = db.Column(db.String)
    rating = db.Column(db.Integer)
    pic = db.Column(db.String)
    visible = db.Column(db.Boolean, default=True)

    bud = db.relationship("BudTracker", back_populates="smoke_sessions")

    user = db.relationship("User", back_populates="smoke_sessions")

    def __repr__(self):
        return f"""
            <SmokeSession #{self.id}:
                User_id: {self.user_id}
                Date: {self.date}
                Time: {self.time}
                Location: {self.location}
                Strain: {self.strain}
                Amount: {self.amount}
                Rating: {self.rating}
                Effects: {self.effects}
                Pic: {self.pic}
                Notes: {self.notes}
            />
        """
