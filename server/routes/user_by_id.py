from . import (
    Resource,
    user_schema,
    g,
    request,
    db,
    jwt_required,
)


class UserById(Resource):
    @jwt_required()
    def get(self, id):
        if g.user:
            return user_schema.dump(g.user), 200
        return {"message": "User not found."}, 404

    @jwt_required()
    def patch(self, id):
        if g.user:
            try:
                data = request.json
                update_user = user_schema.load(data, instance=g.user, partial=True)
                db.session.commit()
                return user_schema.dump(update_user), 202
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 422
        return {"message": "User not found."}, 404

    @jwt_required()
    def delete(self, id):
        if g.user:
            try:
                db.session.delete(g.user)
                db.session.commit()
                return "", 204
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 400
        return {"message": "User not found"}, 404
