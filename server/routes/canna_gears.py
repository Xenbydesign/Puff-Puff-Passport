from . import (
    Resource,
    request,
    db,
    canna_gear_schema,
    canna_gears_schema,
    CannaGear,
    current_user,
    jwt_required,
)


class CannaGears(Resource):
    @jwt_required()
    def get(self):
        try:
            user_gear = CannaGear.query.filter_by(user_id=current_user.id).all()
            gear_data = canna_gears_schema.dump(user_gear)
            return gear_data, 200
        except Exception as e:
            return {"message": str(e)}, 400

    def post(self):
        try:
            data = request.get_json()
            print(data)
            new_gear = canna_gear_schema.load(data)
            db.session.add(new_gear)
            db.session.commit()
            return canna_gear_schema.dump(new_gear), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422
