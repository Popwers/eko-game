import io from "socket.io-client";

export default class SocketClient {
    constructor() {
        // Connexion avec le serveur
        this.socket = io('http://localhost:3000');

        this.ecran = null;
        this.jeu = null;
        this.joueur = null;
        this.game = null;
    }

    subscribtoConnexion = (callBack) => {
        this.socket.on('connexion', data => callBack(null, data));
    }

    /*
        onLoginStep1 = (event) => {
            // On empeche la page de se recharger
            event.preventDefault();
    
            // On doit sauvegarder le code room et le pseudo
            const room = $("#code").val();
            const pseudo = $("#pseudo").val();
    
            this.joueur = new Joueur(room, pseudo);
    
            this.rafraichirJeu("login_step2");
    
            return false; // le formulaire est annulé
        }
    
    
        onLoginStep2 = (event) => {
            // On empeche la page de se recharger
            event.preventDefault();
    
            const equipe = $("#choix_equipe").val();
    
            if (equipe || false) {
                this.joueur.setEquipe(equipe);
                // On se connecte au serveur pour jouer
    
                this.socket.emit("ekoLogin", this.joueur, this.onLogged);
                this.rafraichirJeu("waiting_player");
    
            } else {
                // On affiche un message d'erreur
                $("#login_error").show();
            }
    
            return false; // le formulaire est annulé
        }
    
    
        onLogged = (jeu) => {
            console.log("Resultat du login", jeu)
            this.jeu = jeu;
            this.rafraichirAttente()
        }
    
    
        newPlayer = (jeu) => {
            console.log("Nouveau joueur", jeu);
            this.jeu = jeu;
            this.rafraichirAttente()
        }
    
    
        playerLeave = (jeu) => {
            console.log("Un joueur a quitté la partie", jeu);
            this.jeu = jeu;
            // Si le jeu est pret, on le rafraichi sinon c'est la salle d'attente
            if (this.jeu.isReady && this.game) {
                this.game.rafraichir();
            } else {
                this.rafraichirAttente()
            }
        }
    
        beginGame = () => {
            // On a recu un message indiquant le début de jeu
            this.rafraichirJeu("plateauJeu");
            this.game = new Game(this.jeu, this.joueur, this);
            this.game.debuter();
        }
    
    
        rafraichirJeu(nouvelEcran) {
            // doit masquer l'ancien écran
            if (this.ecran !== null) {
                const selector = "[data-screen='" + this.ecran + "']";
                $(selector).appendTo($("#tmplEcrans"));
            }
            this.ecran = nouvelEcran;
    
            // Affiche le bon ecran
            const nouveauSelector = "[data-screen='" + this.ecran + "']";
            $(nouveauSelector).appendTo($("#zonePrincipale"));
        }
    
        rafraichirAttente = () => {
            if (!this.jeu) {
                return;
            }
    
            if (this.jeu.listeEcologiste || false) {
                // rafraichi la piste ecolo
                $("#attente_listeEcolos").html("");
                this.jeu.listeEcologiste.forEach(joueur => {
                    $("#attente_listeEcolos").append(joueur.pseudo + "<br>");
                })
            }
    
            if (this.jeu.listePollueur || false) {
                // rafraichi la piste pollueur
                $("#attente_listePollueurs").html("");
                this.jeu.listePollueur.forEach(joueur => {
                    $("#attente_listePollueurs").append(joueur.pseudo + "<br>");
                })
            }
        }*/
}