from config import api, app, db, jwt
from models.user import User
from routes.budtracker_by_id import BudTrackerById
from routes.budtrackers import BudTrackers
from routes.canna_gear_by_id import CannaGearById
from routes.canna_gears import CannaGears
from routes.strains import Strains

# routes
from routes.user_by_id import UserById
from routes.yelp import YelpData

api.add_resource(YelpData, "/yelp")
api.add_resource(CannaGearById, "/canna-gears/<int:id>")
api.add_resource(CannaGears, "/canna-gears")
api.add_resource(BudTrackers, "/bud-trackers")
api.add_resource(BudTrackerById, "/bud-trackers/<int:id>")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(Strains, "/strains")

# auth
from routes.auth.check_session import CheckSession
from routes.auth.refresh import Refresh
from routes.auth.login import Login
from routes.auth.logout import Logout
from routes.auth.signup import SignUp
from routes.auth.verify_password import VerifyPassword
from routes.auth.google_auth import GoogleAuth

api.add_resource(GoogleAuth, "/google-auth")
api.add_resource(VerifyPassword, "/verify-password/<int:id>")
api.add_resource(SignUp, "/signup")
api.add_resource(Logout, "/logout")
api.add_resource(Login, "/login")
api.add_resource(Refresh, "/refresh")
api.add_resource(CheckSession, "/me")


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return db.session.get(User, identity)


if __name__ == "__main__":
    app.run(port=5555, debug=True)
