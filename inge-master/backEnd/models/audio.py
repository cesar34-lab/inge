from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Audio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255), nullable=False)
    url = db.Column(db.String(255), nullable=False)  # La URL donde se guarda el archivo de audio

    def __init__(self, nombre, url):
        self.nombre = nombre
        self.url = url
