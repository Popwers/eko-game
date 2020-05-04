const app = require("express")();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const next = require("next");
const dotenv = require("dotenv");

dotenv.config();
const port = normalizePort(process.env.PORT || 3000);

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandle = nextApp.getRequestHandler();

// Charge les class
const Partie = require('./private/class/Partie.js');

// Creer la liste des Parties Publics
let publicList = new Array();

// Creer la liste des Parties Privé
let privateList = new Array();

// Liste des joueurs
let listAllPlayers = new Array();

nextApp.prepare().then(() => {

	// Route qui écoute : Renvoie vers l'interface de jeu
	app.get('/jeu', (req, res) => {
		return nextApp.render(req, res, "/jeu", req.query);
	});

	// Route qui écoute : Renvoie vers la page demandé ou 404
	// Ici je l'ai modifié pour toujours retournée a l'index
	app.all("*", (req, res) => {
		//return nextHandle(req, res);
		return nextApp.render(req, res, "/index", req.query);
	});

	io.on("connection", (socket) => {
		socket.emit('connexion', true, (err, player) => {
			console.log(listAllPlayers);
			console.log(player.name);
			
			listAllPlayers.forEach(playerElement => {
				if (playerElement == player.name) {
					publicList.forEach(partieSearch => {
						if (partieSearch.code == player.code) {
							socket._partie = partieSearch;
						}
					});

					privateList.forEach(partieSearch => {
						if (partieSearch.code == player.code) {
							socket._partie = partieSearch;
						}
					});

					console.log(socket._partie);

					socket._player = player.name;
					console.log(`${player.name} est à nouveau connecté !`);
					return;
				}
			});
			console.log('Nouveau joueurs !');
		});

		socket.on('joinPublicGame', (player, callback) => {
			const equipe = player.equipe;
			const name = player.name;
			let partie = null;

			// On parcours toutes les partie pour y ajouter le joueur
			console.log("Recherche d'une partie");
			publicList.forEach(game => {
				if (!game.isReady) {
					if (equipe === "ecologiste") {
						partie = game.ajouterEcologiste(name);
					} else {
						partie = game.ajouterPollueur(name);
					}
				}

				if (partie || false) return; // Plus besoin de regarder les jeux suivantes, on quitte la boucle
			});

			console.log("Jeu trouvée : ", partie);

			// Pas de partie disponible création d'une partie
			if (!partie) {
				console.log("On crée une nouvelle partie");
				partie = new Partie(process.env.MAX_JOUEUR, process.env.MAX_TOUR);
				if (equipe === "ecologiste") {
					partie.ajouterEcologiste(name);
				} else {
					partie.ajouterPollueur(name);
				}
				publicList.push(partie);
			}

			// socket.join : Le Joueur rejoin le channel socket.io "Partie: xxxxx"
			// Ainsi il n'ecoutera que les message de ce canal
			// Chaque jeu sera donc isolée
			socket.join(partie.code);
			listAllPlayers.push(name);

			// On associe la partie à la socket
			socket._partieConnexion = partie;

			// On appel la fonction de callback coté client
			const dataCallback = {
				codeRoom: partie.code,
				NbrJoueursCo: partie.listeEcologiste.length + partie.listePollueur.length,
				NbrJoueursMax: partie.nbrJoueurMax,
				listEcolos: partie.listeEcologiste,
				listPollueurs: partie.listePollueur,
			};
			callback(dataCallback);

			// On envoi un message a tout les utilisateurs
			// a l'exception de celui qui a envoyé le message ekoLogin
			const dataPartie = {
				NbrJoueursCo: partie.listeEcologiste.length + partie.listePollueur.length,
				listEcolos: partie.listeEcologiste,
				listPollueurs: partie.listePollueur,
			};
			socket.broadcast.to(partie.code).emit('newPlayer', dataPartie);

			if (partie.isReady) {
				socket.broadcast.to(partie.code).emit('gameReady');
				socket.emit('gameReady');
			}
		});

		socket.on('leaveGame', player => {
			partie = socket._partieConnexion;
			if (partie || false) {
				partie.retirerJoueur(player);
				listAllPlayers = listAllPlayers.filter(item => item !== player);
				const dataCallback = {
					NbrJoueursCo: partie.listeEcologiste.length + partie.listePollueur.length,
					listEcolos: partie.listeEcologiste,
					listPollueurs: partie.listePollueur,
				};
				socket.broadcast.to(partie.code).emit('playerLeave', dataCallback);
			}
		});
	});

	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`);
	});
});

/* ***************************** */
/* ********* FUNCTIONS ********* */
/* ***************************** */

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}