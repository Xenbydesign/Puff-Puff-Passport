from . import Resource, request, db, Strain, strains_schema


class Strains(Resource):
    def get(self):
        try:
            strain = strains_schema.dump(Strain.query)
            return strain, 200
        except Exception as e:
            return str(e), 400
