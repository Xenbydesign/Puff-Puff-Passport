from . import db, flask_bcrypt, re
from sqlalchemy.ext.hybrid import hybrid_property


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    birthday = db.Column(db.String, nullable=False)
    profile_pic = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())
    _password_hash = db.Column(db.String)
    google_unique_id = db.Column(db.String)

    bud = db.relationship(
        "BudTracker",
        back_populates="user",
    )
    cannagear = db.relationship("CannaGear", back_populates="user")

    smoke_sessions = db.relationship("SmokeSession", back_populates="user")

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Passwords cannot be inspected after being setup!")

    @password_hash.setter
    def password_hash(self, new_password):
        hashed_password = flask_bcrypt.generate_password_hash(new_password).decode(
            "utf-8"
        )
        self._password_hash = hashed_password

    def authenticate(self, password_to_check):
        return flask_bcrypt.check_password_hash(self._password_hash, password_to_check)

    def __repr__(self):
        return f"User #{self.id}: {self.username}"
