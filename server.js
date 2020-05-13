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

// Charge la class Partie qui gère les jeux
const Partie = require('./private/class/Partie.js');

// Liste des Parties Publics
let publicList = new Array();

// Liste des Parties Privé
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
		console.log('Connexion d\'un joueur !');

		socket.emit('connexion', true, (err, player) => {
			console.log('Recherche dans la base de donnée des joueurs ...');
			let searchJoueur = false;

			for (let playerElement of listAllPlayers) {
				if (playerElement == player.name) {
					for (let partieSearch of publicList) {
						if (partieSearch.code == player.code) {
							socket._partie = partieSearch;
							break;
						}
					}

					for (let partieSearch of privateList) {
						if (partieSearch.code == player.code) {
							socket._partie = partieSearch;
							break;
						}
					}

					console.log(socket._partie);

					socket._player = player.name;
					console.log(`${player.name} est à nouveau connecté !`);
					searchJoueur = true;
					break;
				}
			}

			if (!searchJoueur) {
				console.log('Nouveau joueur !');
			}
		});

		/* Vérifie si le nom du joueur est diponible */
		socket.on('checkPseudo', (playerName, callback) => {
			let nameIsFree = true;
			for (let player of listAllPlayers) {
				if (player == playerName) {
					nameIsFree = false;
					break;
				}
			}

			if (nameIsFree) listAllPlayers.push(playerName);
			if (nameIsFree) {
				console.log('Nouveau joueur créer : ' + playerName);
				console.log(`Liste des joueurs connecté au jeu : ${listAllPlayers}`);
			}
			callback(nameIsFree);
		});

		/* Libére un pseudo si le joueur change de nom  */
		socket.on('leavePseudo', (playerName) => {
			listAllPlayers = listAllPlayers.filter(item => item !== playerName);
			console.log('Pseudo : ' + playerName + ' libéré !');
		});

		/* Le joueur quitte la partie en cours */
		socket.on('leaveGame', player => {
			partie = socket._partieConnexion;
			if (partie) {
				partie.retirerJoueur(player);
				listAllPlayers = listAllPlayers.filter(item => item !== player);
				console.log(player + ' a quitté la partie ' + partie.code);
				const dataCallback = {
					NbrJoueursCo: partie.listeEcologiste.length + partie.listePollueur.length,
					listEcolos: partie.listeEcologiste,
					listPollueurs: partie.listePollueur,
				};
				socket.broadcast.to(partie.code).emit('playerLeave', dataCallback);
			}
		});

		/* Ajoute un joueur à une partie public */
		socket.on('joinPublicGame', (player, callback) => {
			const equipe = player.equipe;
			const name = player.name;
			let partie = null;

			console.log(`${name} recherche une partie ...`);

			// On parcours toutes les partie pour y ajouter le joueur
			for (let game of publicList) {
				if (!game.isReady) {
					if (equipe === "ecologiste") {
						partie = game.ajouterEcologiste(name);
					} else {
						partie = game.ajouterPollueur(name);
					}
				}

				if (partie || false) break; // Plus besoin de regarder les jeux suivantes, on quitte la boucle
			}

			console.log("Partie trouvée : ", partie);

			// Pas de partie disponible création d'une partie
			if (!partie) {
				console.log("Pas de partie trouvé, création en cours ...");
				partie = new Partie(process.env.MAX_JOUEUR, process.env.MAX_TOUR);
				if (equipe === "ecologiste") {
					partie.ajouterEcologiste(name);
				} else {
					partie.ajouterPollueur(name);
				}
				publicList.push(partie);
				console.log("Partie créer !");
			}

			// socket.join : Le Joueur rejoin le channel socket.io "Partie: xxxxx"
			// Ainsi il n'ecoutera que les message de ce canal
			// Chaque jeu sera donc isolée
			socket.join(partie.code);

			console.log(`Le joueur a rejoins la partie (File d'attente)`);

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
				console.log(`La partie ${partie.code} est prête à être démarré !`);
				socket.broadcast.to(partie.code).emit('gameReady');
				socket.emit('gameReady');
			}
		});

		/* Ajoute un joueur à une partie privé */
		socket.on('joinPrivateGame', (player, callback) => {
			const equipe = player.equipe;
			const name = player.name;
			const codePart = player.code;
			let partie = null;

			// On parcours toutes les partie pour y ajouter le joueur
			console.log(`${name} recherche la partie privé ${codePart} ...`);

			let isFull = false;
			for (let game of privateList) {
				if (!game.isReady && game.code == codePart) {
					if (equipe === "ecologiste") {
						partie = game.ajouterEcologiste(name);
					} else {
						partie = game.ajouterPollueur(name);
					}

					if (partie != null) {
						isFull = true;
					}
				}

				if (partie || false) break; // Plus besoin de regarder les jeux suivantes, on quitte la boucle
			}

			// Pas de partie trouvé ou la partie est déjà pleine !
			if (!partie) {
				let dataCallback = null;
				if (isFull) {
					console.log(`La partie privé ${codePart} est complet !`);
					dataCallback = {
						statut: 'isFull',
						NbrJoueursCo: null,
						NbrJoueursMax: null,
						listEcolos: null,
						listPollueurs: null,
					};
				} else {
					console.log(`La partie privé ${codePart} n'existe pas !`);
					dataCallback = {
						statut: 'notFound',
						NbrJoueursCo: null,
						NbrJoueursMax: null,
						listEcolos: null,
						listPollueurs: null,
					};
				}

				callback(dataCallback);
			} else {
				console.log(`Partie privé ${codePart} trouvée !`);
				socket.join(partie.code);

				console.log(`Le joueur a rejoins la partie (File d'attente)`);

				socket._partieConnexion = partie;

				const dataCallback = {
					statut: 'success',
					NbrJoueursCo: partie.listeEcologiste.length + partie.listePollueur.length,
					NbrJoueursMax: partie.nbrJoueurMax,
					listEcolos: partie.listeEcologiste,
					listPollueurs: partie.listePollueur,
				};
				callback(dataCallback);

				const dataPartie = {
					NbrJoueursCo: partie.listeEcologiste.length + partie.listePollueur.length,
					listEcolos: partie.listeEcologiste,
					listPollueurs: partie.listePollueur,
				};
				socket.broadcast.to(partie.code).emit('newPlayer', dataPartie);

				if (partie.isReady) {
					console.log(`La partie ${partie.code} est prête à être démarré !`);
					socket.broadcast.to(partie.code).emit('gameReady');
					socket.emit('gameReady');
				}
			}
		});

		/* Créer une partie privé et assigne le joueur hote */
		socket.on('createPrivateGame', (player, callback) => {
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