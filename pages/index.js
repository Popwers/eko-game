import React from 'react';
import Router from 'next/router'
import Container from "../components/layout/Container";
import Home from '../components/views/home';
import PrivateRoom from '../components/views/privateRoom';
import PrivateRoomConfig from '../components/views/privateRoomConfig';
import PrivateRoomCode from '../components/views/privateRoomCode';
import EquipeChoose from '../components/views/equipeChoose';
import FileAttente from '../components/views/fileAttente';
import SocketClient from "../lib/socketClient";
export default class Index extends React.Component {

	/* Définis les props initiales */
	static defaultProps = {
		initialeEquipe: null,
		initialeNombreTours: 4,
		initialeNombreJoueurMaxs: 4,
		initialenombreJoueurCo: 0,
		initailBlurBackground: false,
		initialCodePrivateRoom: null,
		initialPseudo: null,
		initialLink: 'home',
		stat: false,
		initialList: [],
	}

	constructor(props) {
		super(props);
		this.state = {
			statut: props.stat,
			equipeChoose: props.initialeEquipe, 
			blurBackground: props.initailBlurBackground,
			nombreTourMax: props.initialeNombreTours,
			nombreJoueurCo: props.initialenombreJoueurCo,
			nombreJoueurMax: props.initialeNombreJoueurMaxs,
			codePrivateRoom: props.initialCodePrivateRoom,
			pseudo: props.initialPseudo,
			currentLink: props.initialLink,
			listEcolos: props.initialList,
			listPollueurs: props.initialList,
		};

		this.history = [];
		this.socketClient = new SocketClient();
	}

	/* A la création du composant attache l'événement 'popstate' pour gérer le retour navigateur
	/* Attache les évenements de connexion avec le serveur */
	componentDidMount() {
		window.addEventListener("popstate", this.handlePopState);
		this.socketClient.subscribeConnexion((data) => {
			this.setState({
				statut: data,
			});

			const dataToServer = { name: 'null', code: 'null' };
			return dataToServer;
		});

		this.socketClient.subscribePlayersStats(data => {
			console.log(data);
			this.setState({
				nombreJoueurCo: data.NbrJoueursCo,
				listEcolos: data.listEcolos,
				listPollueurs: data.listPollueurs,
			});
		});

		this.socketClient.subscribeStartGame(() => {
			Router.push({ 
				pathname: '/jeu', 
				query: {
					codePartie: this.state.codePrivateRoom,
					pseudo: this.state.pseudo,
				}
			});
		});
	}

	/* Fonction de attaché au tous lien, pour vérifier les datas envoyées
	/* Exemple si on va dans privateRoom ou fileAttente ('On est dans Home')
	/* Il faut check que l'utilisateur à bien rentrer son pseudo pour continuer */
	handleRedirect = (link) => {
		switch (this.state.currentLink) {
			case 'home':
				switch (link) {
					case 'privateRoom':
					case 'equipeChoose':
						this.state.pseudo !== null ? this.handleTrueRedirection(link) : false;
						break;
				}
				break;

			case 'privateRoom':
				switch (link) {
					case 'equipeChoose':
						this.state.codePrivateRoom !== null ? this.handleTrueRedirection(link) : false;
						break;

					case 'privateRoomConfig':
						this.handleTrueRedirection(link);
						break;
				}
				break;
			
			case 'privateRoomConfig':
				switch (link) {
					case 'privateRoomCode':
						this.handleTrueRedirection(link);
						break;
				}
				break;

			case 'privateRoomCode':
				switch (link) {
					case 'equipeChoose':
						this.handleTrueRedirection(link);
						break;
				}
				break;	
				
			case 'equipeChoose':
				switch (link) {
					case 'fileAttente':
						if (this.state.equipeChoose !== null) {
							this.socketClient.startPublicPartie(this.state.pseudo, this.state.equipeChoose, data => {
								this.setState({
									codePrivateRoom: data.codeRoom,
									nombreJoueurCo: data.NbrJoueursCo,
									nombreJoueurMax: data.NbrJoueursMax,
									listEcolos: data.listEcolos,
									listPollueurs: data.listPollueurs,
								});
								this.handleTrueRedirection(link);
							});
						}
						break;
				}
				break;	
		}
	}

	/* Fonction pour rediriger l'utilisateur sur la vue
	/* La fonction enregitre l'historique et met à jours l'url
	/* Cela permet de faire des retours vers les autres vues */
	handleTrueRedirection = (link) => {
		this.history.push(this.state.currentLink);
		window.history.pushState(link, link, `/${link}`);
		this.setState({
			blurBackground: (link === 'fileAttente' || link === 'equipeChoose') ? true : false,
			currentLink: link
		});
	}

	/* Fonction appellé lorsque l'utilisateur fait un retour
	/* Il est redirigé vers l'ancienne vue */
	handlePopState = () => {
		if (this.history.length > 0) {
			if (this.state.currentLink === 'fileAttente') {
				this.socketClient.leaveGame(this.state.pseudo);
				this.setState({
					codePrivateRoom: null,
					nombreJoueurCo: 0,
					nombreJoueurMax: 4,
					listEcolos: null,
					listPollueurs: null,
				});
			}

			const previousState = this.history[this.history.length - 1];
			this.history.splice(this.history.length - 1, 1);
			window.history.pushState(previousState, previousState, `/${previousState}`);
			this.setState({
				blurBackground: (previousState === 'fileAttente' || previousState === 'equipeChoose') ? true : false,
				currentLink: previousState
			});
		}
	}

	/* Fonction de mise à jours du pseudo
	/* Rapel: this.setState appel automatique render() */
	handleChangePseudo = (newPseudo) => {
		if (newPseudo == '') newPseudo = null;
		this.setState({
			pseudo: newPseudo
		});
	}

	/* Fonction de mise à jours du code PrivateRoom */
	handleChangeCodePrivateRoom = (newCode) => {
		if (newCode == '') newCode = null;
		this.setState({
			codePrivateRoom: newCode
		});
	}

	/* Fonction de mise à jours du Nombre de joueur sur PrivateRoom */
	handleChangeNombreJoueurMax = (newJoueurs) => {
		this.setState({
			nombreJoueurMax: newJoueurs
		});
	}

	/* Fonction de mise à jours du nombre de tours max sur PrivateRoom */
	handleChangeToursMax = (newTours) => {
		this.setState({
			nombreTourMax: newTours
		});
	}

	/* Fonction de mise à jours de l'équipe choisis */
	handleChangeEquipe = (newEquipe) => {
		this.setState({
			equipeChoose: newEquipe
		});
	}

	render() {
		let form = null;

		/* En fonction du link on affiche le bon composants qui sont les 'vues' ou 'routes'
		/* @initInput    - Définis la valeur afficher par l'input, si null n'affiche rien
		/* 			     - Permet de sauvegarder les valeurs pour les retours
		/* @redirectTo   - Attache la fonction de vérification ou de redirection direct pour les button du composants
		/* @checkPseudo  - Attache la fonction de modification du pseudo
		/* @buttonStat   - Renvoie true ou false en fonction de la présence du pseudo pour mettre a jour l'état disabled des buttons*/
		switch (this.state.currentLink) {
			case 'home':
				form = <Home initInput={this.state.pseudo}
							 redirectTo={this.handleRedirect}
							 checkPseudo={this.handleChangePseudo} 
							 buttonStat={this.state.pseudo === null ? true : false} />;
				break;

			case 'privateRoom':
				form = <PrivateRoom initInput={this.state.codePrivateRoom}
									redirectTo={this.handleRedirect}
									changeCodePrivateRoom={this.handleChangeCodePrivateRoom}
									buttonStat={this.state.codePrivateRoom === null ? true : false} />;
				break;

			case 'privateRoomConfig':
				form = <PrivateRoomConfig initRange={this.state.nombreTourMax}
										  initCheck={this.state.nombreJoueurMax}
										  redirectTo={this.handleRedirect}
										  changeTourMax={this.handleChangeToursMax}
										  changeJoueursMax={this.handleChangeNombreJoueurMax} />;
				break;

			case 'privateRoomCode':
				form = <PrivateRoomCode initInput={this.state.codePrivateRoom}
										redirectTo={this.handleRedirect} />;
				break;

			case 'equipeChoose':
				form = <EquipeChoose choseEquipe={this.handleChangeEquipe}
									 redirectTo={this.handleRedirect}
									 initialChooseE={this.state.equipeChoose}
									 buttonStat={this.state.equipeChoose === null ? true : false} />;
				break;

			case 'fileAttente':
				form = <FileAttente redirectTo={this.handleRedirect}
									codeRoom={this.state.codePrivateRoom}
									NbrJoueursCo={this.state.nombreJoueurCo}
									NbrJoueursMax={this.state.nombreJoueurMax}
									listEcolos={this.state.listEcolos}
									listPollueurs={this.state.listPollueurs} />;
				break;

			default:
				form = <Home redirectTo={this.handleRedirect} />;
				break;
		}

		return (
			<Container center blur={this.state.blurBackground} >
				<p>Statut de connexion: {this.state.statut ? 'en ligne' : 'hors ligne'}</p>
				{form}
			</Container>
		)
	}
}