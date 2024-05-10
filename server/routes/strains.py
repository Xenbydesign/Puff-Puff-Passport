from . import Resource, request, db, Strain, strains_schema, jwt_required


class Strains(Resource):
    @jwt_required()
    def get(self):
        try:
            strain = strains_schema.dump(Strain.query)
            return strain, 200
        except Exception as e:
            return str(e), 400
