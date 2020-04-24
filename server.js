const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const next = require("next");

dotenv.config();
const port = normalizePort(process.env.PORT || 3000);

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Charge les class
const Partie = require('./private/class/Partie.js');

// Creer la liste des Parties Publics
const publicList = new Array();

// Creer la liste des Parties Privé
const privateList = new Array();

app.prepare().then(() => {
	const serverApp = express();
	const server = http.createServer(serverApp);
	const io = require("socket.io")(server);

	// Route qui écoute : Renvoie vers la page demandé ou 404
	// Ici je l'ai modifié pour toujours retournée a l'index pour l'instant
	serverApp.all("*", (req, res) => {
		//return handle(req, res);
		return app.render(req, res, "/index", req.query);
	});

	io.on("connection", (socket) => {
		console.log("Nouveau joueur connecté");

		socket.on("createGame", function () {
			console.log("user want partie");

			var data = {
				plateau: createUrl(5),
				joueur: createUrl(5),
			};

			partiesEnCours.push(new Partie(app, socket, data));
		});

		socket.on('joinPublicGame', (player, callback) => {
			const equipe = player.equipe;
			const name = player.name;
			let room = null;

			/*// On parcours toutes les rooms pour y ajouter le joueur
			for (let i = 0; i < listeDesJeux.length; i++) {
				console.log("On cherche une jeu ");
				const leJeu = listeDesJeux[i];
				if (!leJeu.isPrivate && !leJeu.isReady) {
					// La jeu n'est pas privée
					// On a le droit d'ajouter le joueur
					if (equipe === "ecologiste") {
						// On ajoute le joueur si il y a de la place
						room = leJeu.ajouterEcologiste(joueur);
					} else {
						room = leJeu.ajouterPollueur(joueur);
					}
				}

				if (room || false) {
					// On plus besoin de regarder les jeux suivantes
					break; // on quitte la boucle
				}
			}
			console.log("Jeu trouvée : ", room);


			if (!room) {
				// On a pas trouvé de jeu dispo pour ce joueur !!!
				// On crée une jeu
				// ! -> veut sire NON [variable]
				const nom = "Jeu_" + Utility.getRandomInt(1, 99999);
				console.log("On crée une nouvelle jeu : " + nom);
				room = new Jeu(nom, MAX_JOUEUR, MAX_TOUR);
				if (equipe === "ecologiste") {
					// On ajoute le joueur aux ecolo
					room.ajouterEcologiste(joueur);
				} else {
					// On ajoute le joueur aux pollueur
					room.ajouterPollueur(joueur);
				}
				listeDesJeux.push(room);

			}

			// ICI : On a obligatoirement une room pour le joueur
			//console.log(listeDesJeux);

			// socket.join : Le Joueur rejoin le channel socket.io "Jeu_xxxx"
			// Ainsi il n'ecoutera que les message de ce canal
			// Chaque jeu sera donc isolée
			socket.join(room.nom);

			// On sauvegarde le joueur actuel dans la socket
			socket._room = room;
			socket._joueur = joueur;


			// On appel la fonction Eko.onLogged() coté client
			callback(room);

			// On envoi un message a tout les utilisateurs
			// a l'exception de celui qui a envoyé le message ekoLogin
			socket.broadcast.to(room.nom).emit('ekoNewPlayer', room);

			if (room.isReady) {
				socket.broadcast.to(room.nom).emit('ekoBeginGame');
				socket.emit('ekoBeginGame');

			}*/
		});
	});

	serverApp.listen(port, (err) => {
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