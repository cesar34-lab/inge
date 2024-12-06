from flask import Blueprint, request, jsonify
from models.item import db, Item

search = Blueprint('search', __name__)

# Ruta para buscar ítems
@search.route('/search', methods=['GET'])
def buscar():
    query = request.args.get('q')  # Obtener el término de búsqueda desde los parámetros de la URL

    if not query:
        return jsonify({"error": "El parámetro de búsqueda es obligatorio"}), 400

    # Buscar ítems que contengan el término de búsqueda en el nombre o la descripción
    items = Item.query.filter(
        (Item.nombre.ilike(f'%{query}%')) | 
        (Item.descripcion.ilike(f'%{query}%'))
    ).all()

    if not items:
        return jsonify({"message": "No se encontraron ítems"}), 404

    # Convertir los ítems encontrados en un formato JSON
    items_json = [{"id": item.id, "nombre": item.nombre, "descripcion": item.descripcion, "precio": item.precio} for item in items]

    return jsonify({"items": items_json}), 200
