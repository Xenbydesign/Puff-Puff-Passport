from . import BudTracker, ValidationError, fields, ma, re, validate, validates


class BudTrackerSchema(ma.SQLAlchemySchema):
    class Meta:
        model = BudTracker
        load_instance = True

    user = fields.Nested(
        "UserSchema", many=False, only=("id", "username"), exclude=("bud_trackers",)
    )
    strain = fields.Nested(
        "StrainSchema",
        many=False,
        only=("id", "name", "type", "potency", "pic"),
        exclude=("bud_trackers",),
    )

    id = fields.Int(dump_only=True)
    user_id = fields.Int(required=True)
    strain_id = fields.Int(required=True)
    grower = fields.Str()
    dispensary = fields.Str(required=True)
    purchase_date = fields.Str(required=True)
    purchase_amount = fields.Str(required=True)
    cost = fields.Int()
    rating = fields.Int(allow_none=True)
    flavor = fields.Str()
    pic = fields.Str()
    my_effects = fields.Str()
    in_stock = fields.Boolean(
        required=True,
        error_messages={"invalid": "in_stock must be a boolean value (True or False)."},
    )

    @validates("rating")
    def validate_rating(self, rating):
        if rating is not None and not (1 <= rating <= 5):
            raise ValidationError("Rating must be between 1 and 5")
        return rating


bud_tracker_schema = BudTrackerSchema()
bud_trackers_schema = BudTrackerSchema(many=True, exclude=("user",))
