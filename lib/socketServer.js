class Socket {
    constructor(app, socket, code) {
        this.app = app;
        this.socket = socket;
        this.linkPlateau = data.plateau;
        this.linkJoueur = data.joueur;

        socket.emit('newGame', data);

        this.app.get('/' + this.linkJoueur, function (req, res) {
            res.sendFile(__dirname + '/public/front/joueur.html');
        });

        this.app.get('/' + this.linkPlateau, function (req, res) {
            res.sendFile(__dirname + '/public/front/plateau.html');
        });
    }
}

function createUrl(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}