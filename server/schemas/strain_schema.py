from . import Strain, fields, ma


class StrainSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Strain
        load_instance = True
        fields = [
            "id",
            "name",
            "type",
            "potency",
            "effects",
            "flavor",
            "description",
            "pic",
            "bud_trackers",
        ]

        dump_only = fields
        url = ma.URLFor("api.strains_detail", id="<id>", _external=True)


strain_schema = StrainSchema()
strains_schema = StrainSchema(many=True)
