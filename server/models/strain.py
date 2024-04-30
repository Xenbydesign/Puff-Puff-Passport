from . import db


class Strain(db.Model):
    __tablename__ = "strains"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    type = db.Column(db.String)
    potency = db.Column(db.String)
    effects = db.Column(db.String)
    flavor = db.Column(db.String)
    description = db.Column(db.String)
    pic = db.Column(db.String)

    bud = db.relationship("BudTracker", back_populates="strain")

    def __repr__(self):
        return f"""
            <Strain #{self.id}:
                Name: {self.name}
                Type: {self.type}
                Potency: {self.potency}
                Effects: {self.effects}
                Flavor: {self.flavor}
                Description: {self.description}
                Pic: {self.pic}
            />
        """
