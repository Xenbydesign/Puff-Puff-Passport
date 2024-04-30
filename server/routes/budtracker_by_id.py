from . import request, g, Resource, db, bud_tracker_schema


#  still need to add jwt
class BudTrackerById(Resource):
    def get(self, id):
        if g.bud:
            return bud_tracker_schema.dump(g.bud), 200
        return {"message": f"Could not find tracked bud with id #{id}"}, 404

    def patch(self, id):
        if g.bud:
            try:
                data = request.json
                updated_bud = bud_tracker_schema.load(
                    data, instance=g.bud, partial=True
                )
                db.session.commit()
                return bud_tracker_schema.dump(updated_bud), 200
            except Exception as e:
                db.session.rollback()
                return {"message": str(e)}, 422
        return {"message": f"Could not find tracked bud with id #{id}"}, 404

    def delete(self, id):
        if g.bud:
            db.session.delete(g.bud)
            db.session.commit()
            return "", 204
        return {"message": f"Could not find tracked bud with id #{id}"}, 404
