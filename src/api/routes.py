"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"msg": "email and password are required"}), 400
    if User.query.filter_by(email=email).first() is not None:
        return jsonify({"msg": "email already registered"}), 409
    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "user created"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json(silent=True) or {}
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"msg": "email and password are required"}), 400
    user = User.query.filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({"msg": "invalid credentials"}), 401
    token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": token}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    return jsonify({"msg": "private content", "user_id": current_user_id}), 200