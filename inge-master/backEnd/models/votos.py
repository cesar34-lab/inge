from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Voto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)

    item = db.relationship('Item', backref=db.backref('votos', lazy=True))
    usuario = db.relationship('Usuario', backref=db.backref('votos', lazy=True))

    def __init__(self, item_id, usuario_id):
        self.item_id = item_id
        self.usuario_id = usuario_id
