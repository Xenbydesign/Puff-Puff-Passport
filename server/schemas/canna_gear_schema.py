from . import CannaGear, ValidationError, fields, ma, re, validate, validates


class CannaGearSchema(ma.SQLAlchemySchema):
    class Meta:
        model = CannaGear
        load_instance = True

    user = fields.Nested(
        "UserSchema", many=False, only=("id", "username"), exclude=("canna_gears",)
    )

    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    gear_type = fields.Str(required=True)
    brand = fields.Str(required=True)
    model = fields.Str()
    purchase_date = fields.Str()
    price = fields.Int()
    rating = fields.Int(allow_none=True)
    pic = fields.Str()
    notes = fields.Str()
    visible = fields.Boolean(
        required=True,
        error_messages={"invalid": "visible must be a boolean value (True or False)."},
    )

    @validates("rating")
    def validate_rating(self, rating):
        if rating is not None and not (1 <= rating <= 5):
            raise ValidationError("Rating must be between 1 and 5")
        return rating


canna_gear_schema = CannaGearSchema()
canna_gears_schema = CannaGearSchema(many=True)
