from . import request, g, Resource, db, canna_gear_schema, jwt_required


class CannaGearById(Resource):
    @jwt_required()
    def get(self, id):
        if g.gear:
            return canna_gear_schema.dump(g.gear), 200
        return {"message": f"Could not find your gear with id #{id}"}, 404

    @jwt_required()
    def patch(self, id):
        if g.gear:
            try:
                data = request.json
                if "user" in data:
                    del data["user"]
                updated_gear = canna_gear_schema.load(
                    data, instance=g.gear, partial=True
                )
                db.session.commit()
                return canna_gear_schema.dump(updated_gear), 200
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 422
        return {"message": f"Could not find your gear with id #{id}"}, 404

    @jwt_required()
    def delete(self, id):
        if g.gear:
            db.session.delete(g.gear)
            db.session.commit()
            return "", 204
        return {"message": f"Could not find your gear with id #{id}"}, 404
