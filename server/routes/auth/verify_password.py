from .. import Resource, user_schema, g, request, db, check_password_hash


class VerifyPassword(Resource):
    def post(self, id):
        if g.user:
            data = request.json
            current_password = data.get("password")
            if check_password_hash(g.user.password_hash, current_password):
                return {"isValid": True}, 200
            else:
                return {"isValid": False, "message": "Password is incorrect"}, 401
        return {"message": "User not found."}, 404
