class Partie {
    constructor(app, socket, data) {
        this.app = app;
        this.socket = socket;
        this.linkPlateau = data.plateau;
        this.linkJoueur = data.joueur;

        socket.emit("newGame", data);

        this.app.get("/" + this.linkJoueur, function (req, res) {
            res.sendFile(__dirname + "/public/front/joueur.html");
        });

        this.app.get("/" + this.linkPlateau, function (req, res) {
            res.sendFile(__dirname + "/public/front/plateau.html");
        });
    }
}

module.exports = Partie;