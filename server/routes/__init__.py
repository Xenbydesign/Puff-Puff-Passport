# flask
from flask import request, session, make_response, abort, g
from flask_restful import Resource
import requests


# config imports
from config import app, db, os, jwt
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies,
    unset_refresh_cookies,
    unset_access_cookies,
    current_user,
    get_jwt,
    verify_jwt_in_request,
    decode_token,
)


# other
from werkzeug.exceptions import NotFound
from werkzeug.security import check_password_hash

# models
from models.user import User
from models.bud_tracker import BudTracker
from models.strain import Strain
from models.canna_gear import CannaGear

# Schemas
from schemas.user_schema import user_schema
from schemas.budtracker_schema import bud_tracker_schema, bud_trackers_schema
from schemas.strain_schema import strain_schema, strains_schema
from schemas.canna_gear_schema import canna_gear_schema, canna_gears_schema

# general


@app.errorhandler(NotFound)
def not_found(error):
    return {"message": str(error)}, 404


@app.before_request
def before_request():
    path_dict = {
        "userbyid": ("user", User),
        "budtrackerbyid": ("bud", BudTracker),
        "cannagearbyid": ("gear", CannaGear),
    }
    endpoint_info = path_dict.get(request.endpoint)
    if endpoint_info:
        g_key, model = endpoint_info
        record_id = request.view_args.get("id")
        if record_id:
            record = db.session.get(model, record_id)
            setattr(g, g_key, record)
            if record is None:
                g.pop(g_key, None)


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return db.session.get(User, identity)
