/*class Partie {
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

module.exports = Partie;*/


class Partie {
    constructor(nbrJoueurMax, nbrTourMax) {
        this.code = createUrl(5);
        this.scoreEcologiste = 0;
        this.scorePollueur = 0;
        this.listeEcologiste = [];
        this.listePollueur = [];
        this.nbrJoueurMax = Number(nbrJoueurMax);
        this.nbrTourMax = Number(nbrTourMax);
        this.tourEnCours = 0;
        this.joueurEnCours = null;
        this.isReady = false;
    }
    
    ajouterEcologiste(joueur) {
        if (this.listeEcologiste.length < this.nbrJoueurMax / 2) {
            // Il reste une place
            this.listeEcologiste.push(joueur);
            this.verifierDebut();
            return this;
        } else {
            // Il n'y a plus de place dans cette partie pour les Ecolos
            return null;
        }
    }

    ajouterPollueur(joueur) {
        if (this.listePollueur.length < this.nbrJoueurMax / 2) {
            // Il reste une place chez les polleur
            this.listePollueur.push(joueur);
            this.verifierDebut();
            return this;
        } else {
            // Il n'y a plus de place dans cette partie pour les polleur
            return null;
        }
    }

    verifierDebut() {

        if (this.listeEcologiste.length + this.listePollueur.length === this.nbrJoueurMax) {
            this.isReady = true;

            //On assign le premier joueur a jouer
            // TODO : modifier la regle de choix du 1er joueur
            this.joueurEnCours = this.listeEcologiste[0];

        }
    }

    retirerJoueur(playersName) {
        this.listeEcologiste = this.listeEcologiste.filter(item => item !== playersName);
        this.listePollueur = this.listePollueur.filter(item => item !== playersName);
    }


    choixEpreuve(caseFinale) {

        switch (caseFinale) {
            case 0:
            case 4:
            case 8:
            case 12:
            case 17:
            case 21:
            case 25:
            case 29:
                // cerveau
                console.log(" Epreuve Cerveau");
                break;
            case 1:
            case 5:
            case 9:
            case 13:
            case 18:
            case 22:
            case 26:
            case 30:
                // épées
                console.log(" Epreuve Epee");
                break;
            case 2:
            case 6:
            case 10:
            case 14:
            case 19:
            case 23:
            case 27:
            case 31:
                // VS
                console.log(" Epreuve Versus");
                break;
            case 3:
            case 7:
            case 11:
            case 16:
            case 20:
            case 24:
            case 28:
                // Etoile
                console.log(" Epreuve Etoile");
                break;
            case 15:
                // Case Spéciale
                console.log(" Epreuve Spéciale");
                break;
        }
        // return le quizz;
    }
}

/**
 * Generate random URL
 */
function createUrl(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = Partie;