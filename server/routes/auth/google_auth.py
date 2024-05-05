from .. import (
    request,
    Resource,
    make_response,
    db,
    User,
    user_schema,
    os,
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)

from google.auth.transport import requests as google_requests
from google.oauth2 import id_token


CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")


class GoogleAuth(Resource):
    def post(self):
        token = request.json.get("id_token")
        if not token:
            return {"message": "Missing ID token"}, 400

        try:
            id_info = id_token.verify_oauth2_token(
                token, google_requests.Request(), CLIENT_ID
            )
            user = User.query.filter_by(email=id_info.get("email")).first()
            if not user:
                user_data = {
                    "username": id_info.get("given_name"),
                    "email": id_info.get("email"),
                    "password_hash": "passwordtochange!2",
                    "birthday": "1988-11-01",
                }

                user_schema.validate(user_data)
                user = user_schema.load(user_data, session=db.session)
                db.session.add(user)
                db.session.commit()

            jwt = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            response = make_response(user_schema.dump(user), 200 if user else 201)
            set_access_cookies(response, jwt)
            set_refresh_cookies(response, refresh_token)
            return response
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 400
