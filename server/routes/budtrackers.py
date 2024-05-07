from . import (
    Resource,
    request,
    db,
    bud_tracker_schema,
    bud_trackers_schema,
    BudTracker,
    current_user,
    jwt_required,
)


class BudTrackers(Resource):
    @jwt_required()
    def get(self):
        try:
            user_buds = BudTracker.query.filter_by(user_id=current_user.id).all()
            bud_data = bud_trackers_schema.dump(user_buds)
            return bud_data, 200
        except Exception as e:
            return {"message": str(e)}, 400

    @jwt_required()
    def post(self):
        try:
            data = request.get_json()
            new_bud = bud_tracker_schema.load(data)
            db.session.add(new_bud)
            db.session.commit()
            return bud_tracker_schema.dump(new_bud), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422
