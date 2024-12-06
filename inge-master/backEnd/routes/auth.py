from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import check_password_hash

auth = Blueprint('auth', __name__)

# Simulación de base de datos
usuarios = {
    "usuario1": {"password": "hashed_password1"},
    "usuario2": {"password": "hashed_password2"}
}

@auth.route('/login', methods=['POST'])
@auth.route('/signup', methods=['POST'])

def login():
    datos = request.get_json()
    username = datos.get('username')
    password = datos.get('password')

    usuario = usuarios.get(username)
    if not usuario or not check_password_hash(usuario['password'], password):
        return jsonify({"error": "Usuario o contraseña incorrectos"}), 401

    access_token = create_access_token(identity=username)
    return jsonify({"access_token": access_token}), 200
def signup():
    datos = request.get_json()

    # Verificar si los datos son completos
    if not datos or 'username' not in datos or 'password' not in datos or 'email' not in datos:
        return jsonify({"error": "Faltan datos (username, password, email son obligatorios)"}), 400

    username = datos['username']
    password = datos['password']
    email = datos['email']

    # Verificar si el usuario ya existe
    if Usuario.query.filter_by(username=username).first():
        return jsonify({"error": "El nombre de usuario ya está en uso"}), 409

    if Usuario.query.filter_by(email=email).first():
        return jsonify({"error": "El correo ya está registrado"}), 409

    # Crear un nuevo usuario
    nuevo_usuario = Usuario(username=username, password=password, email=email)
    
    # Guardar en la base de datos
    db.session.add(nuevo_usuario)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente"}), 201
