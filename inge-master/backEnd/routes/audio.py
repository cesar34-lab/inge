from flask import Blueprint, request, jsonify
from flask_uploads import UploadNotAllowed
from models.audio import db, Audio, audio_set
import os

audio = Blueprint('audio', __name__)

# Ruta para añadir un archivo de audio
@audio.route('/add_audio', methods=['POST'])
def añadir_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No se ha proporcionado un archivo de audio"}), 400
    
    archivo_audio = request.files['audio']

    if archivo_audio.filename == '':
        return jsonify({"error": "El archivo seleccionado está vacío"}), 400

    try:
        # Guardar el archivo de audio
        filename = audio_set.save(archivo_audio)  # Guarda el archivo en la carpeta configurada
        archivo_url = os.path.join('uploads/audio', filename)  # Generar la URL del archivo guardado

        # Crear un nuevo registro en la base de datos
        nuevo_audio = Audio(nombre=filename, url=archivo_url)
        db.session.add(nuevo_audio)
        db.session.commit()

        return jsonify({"message": "Archivo de audio añadido exitosamente", "audio_url": archivo_url}), 201

    except UploadNotAllowed:
        return jsonify({"error": "El tipo de archivo no está permitido"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500
