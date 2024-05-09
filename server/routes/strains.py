from . import Resource, request, db, Strain, strains_schema


class Strains(Resource):
    def get(self):
        try:
            strain = strains_schema.dump(Strain.query)
            return strain, 200
        except Exception as e:
            return str(e), 400

    def delete(self, id):
        db.session.delete(Strain.query.get(id))
        db.session.commit()
        return "", 204

    def post(self):
        try:
            data = request.get_json()
            new_bud = strains_schema.load(data)
            db.session.add(new_bud)
            db.session.commit()
            return strains_schema.dump(new_bud), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 422
