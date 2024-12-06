from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.item import Item, db
from models.user import Usuario
from models.voto import Voto

voto = Blueprint('voto', __name__)

# Ruta para votar por un ítem
@voto.route('/vote', methods=['POST'])
@jwt_required()
def votar():
    datos = request.get_json()

    if 'item_id' not in datos:
        return jsonify({"error": "Falta el parámetro 'item_id'"}), 400

    item_id = datos['item_id']
    usuario_id = get_jwt_identity()  # Obtener el id del usuario desde el token JWT

    # Verificar que el ítem existe
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"error": "Ítem no encontrado"}), 404

    # Verificar si el usuario ya votó por este ítem
    voto_existente = Voto.query.filter_by(item_id=item_id, usuario_id=usuario_id).first()
    if voto_existente:
        return jsonify({"error": "Ya has votado por este ítem"}), 400

    # Crear un nuevo voto
    nuevo_voto = Voto(item_id=item_id, usuario_id=usuario_id)

    # Guardar el voto en la base de datos
    db.session.add(nuevo_voto)
    db.session.commit()

    return jsonify({"message": "Voto registrado exitosamente"}), 201
