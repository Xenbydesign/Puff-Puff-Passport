from .. import Resource, current_user, db, jwt_required, user_schema


class CheckSession(Resource):
    @jwt_required()
    def get(self):
        if current_user:
            return user_schema.dump(current_user), 200
        else:
            return {"message": "Please log in"}, 401
