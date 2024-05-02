from .. import (
    Resource,
    db,
    request,
    user_schema,
    set_access_cookies,
    set_refresh_cookies,
    create_refresh_token,
    create_access_token,
    make_response,
)


class SignUp(Resource):
    def post(self):
        try:
            data = request.json
            user = user_schema.load(data)
            db.session.add(user)
            db.session.commit()
            import ipdb

            ipdb.set_trace()
            access_token = create_access_token(identity=user.id, fresh=True)
            refresh_token = create_refresh_token(identity=user.id)
            response = make_response(user_schema.dump(user), 201)
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)
            return response
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422
