from . import User, ValidationError, fields, ma, re, validate, validates, datetime


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True

    bud_trackers = fields.Nested("BudTrackerSchema", many=True, exclude=("user",))
    canna_gear = fields.Nested("CannaGearSchema", many=True)

    password_hash = fields.Str(required=True, load_only=True)

    username = fields.String(
        required=True,
        validate=validate.Length(
            min=5, max=20, error="Username must be between 5 and 20 chars"
        ),
    )

    email = fields.Email(required=True)
    birthday = fields.String(
        required=True,
        validate=validate.Range(
            min="1900-01-01",
            max=datetime.date.today().strftime("%Y-%m-%d"),
            error="Must be 21 or older",
        ),
    )
    profile_pic = fields.String(
        required=False,
        validate=validate.Regexp(
            r".*\.(jpeg|png|jpg)",
            error="File URI must be in JPEG, JPG, or PNG format",  # Regular expression to validate the photo.
        ),
    )

    url = ma.Hyperlinks({"self": ma.URLFor("userbyid", values=dict(id="<id>"))})

    @validates("username")
    def validates_username(self, username):
        if not re.match(r"^[a-zA-Z0-9_]*$", username):
            raise ValidationError("Username may only contain letters and digits")
        if user := User.query.filter(User.username == username).first():
            if not user.id:
                raise ValidationError("That username is taken")

    @validates("email")
    def validate_email(self, email):
        if not re.match(r"^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$", email):
            raise ValueError("Invalid email address")
        if user := User.query.filter(User.email == email).first():
            if not user.id:
                raise ValidationError("That email is taken")

    def load(self, data, instance=None, *, partial=False, **kwargs):
        # Load the instance using Marshmallow's default behavior
        loaded_instance = super().load(
            data, instance=instance, partial=partial, **kwargs
        )

        # Set attributes manually, triggering property setters
        for key, value in data.items():
            setattr(loaded_instance, key, value)

        return loaded_instance


user_schema = UserSchema()
