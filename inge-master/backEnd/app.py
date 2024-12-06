from flask import Flask
from flask_jwt_extended import JWTManager
from models.user import db
from models.item import db as db_item
from routes.auth import auth
from routes.search import search
from routes.voto import voto
from routes.audio import audio  # Asegúrate de importar el blueprint de audio
from flask_uploads import UploadSet, configure_uploads, AUDIO
from models.audio import db as db_audio, Audio
from flask_migrate import Migrate
from flesk_cors import CORS

app = Flask(__name__)

# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Cambia esto por tu base de datos real
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuración de JWT
app.config['JWT_SECRET_KEY'] = 'mi_clave_secreta'  # Cambiar por una clave segura

# Configuración para subir archivos (si decides usarlos para almacenamiento temporal)
app.config['UPLOAD_FOLDER'] = 'uploads/'  # Directorio para archivos subidos (opcional)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Limitar tamaño de los archivos subidos a 16MB
CORS(app, origins=["http://localhost:5000"])  # Esto permitirá el acceso desde otros orígenes

# Inicializar la base de datos
db.init_app(app)
db_item.init_app(app)
db_audio.init_app(app)  # Inicializa la base de datos para los audios

# Configuración de migraciones de base de datos
migrate = Migrate(app, db)

# Inicializar UploadSet para manejar archivos de audio
audio_upload = UploadSet('audio', AUDIO)
configure_uploads(app, audio_upload)

# Registrar los blueprints
app.register_blueprint(auth, url_prefix='/api/auth')  # Autenticación
app.register_blueprint(search, url_prefix='/api')  # Búsqueda
app.register_blueprint(voto, url_prefix='/api')  # Votación
app.register_blueprint(audio, url_prefix='/api/audio')  # Registra las rutas de audio (subir y eliminar)

# Crear las tablas de la base de datos si no existen
with app.app_context():
    db.create_all()
    db_item.create_all()
    db_audio.create_all()  # Asegúrate de que la tabla para audios se cree

if __name__ == '__main__':
    app.run(debug=True)
