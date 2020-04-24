import React from 'react';
import Container from "../components/layout/Container";
import Home from '../components/views/home';
import PrivateRoom from '../components/views/privateRoom';
import PrivateRoomConfig from '../components/views/privateRoomConfig';
import PrivateRoomCode from '../components/views/privateRoomCode';
import EquipeChoose from '../components/views/equipeChoose';
import FileAttente from '../components/views/fileAttente';

export default class Index extends React.Component {

	/* Définis les props initiales */
	static defaultProps = {
		initailBlurBackground: false,
		initialCodePrivateRoom: null,
		initialPseudo: null,
		initialLink: 'home',
	}

	constructor(props) {
		super(props);
		this.state = {
			blurBackground: props.initailBlurBackground,
			codePrivateRoom: props.initialCodePrivateRoom,
			pseudo: props.initialPseudo,
			currentLink: props.initialLink,
		};

		this.history = [];
	}

	/* A la création du composant attache l'événement 'popstate' pour gérer le retour navigateur */
	componentDidMount() {
		window.addEventListener("popstate", this.handlePopState);
	}

	/* Fonction de attaché au tous lien, pour vérifier les datas envoyées
	/* Exemple si on va dans privateRoom ou fileAttente ('On est dans Home')
	/* Il faut check que l'utilisateur à bien rentrer son pseudo pour continuer */
	handleRedirect = (link) => {
		switch (this.state.currentLink) {
			case 'home':
				switch (link) {
					case 'privateRoom':
					case 'fileAttente':
						this.state.pseudo !== null ? this.handleTrueRedirection(link) : false;
						break;
				}
				break;

			case 'privateRoom':
				switch (link) {
					case 'fileAttente':
						this.state.codePrivateRoom !== null ? this.handleTrueRedirection(link) : false;
						break;

					case 'privateRoomConfig':
						this.handleTrueRedirection(link);
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
				form = <PrivateRoomConfig redirectTo={this.handleRedirect} />;
				break;

			case 'privateRoomCode':
				form = <PrivateRoomCode redirectTo={this.handleRedirect} />;
				break;

			case 'equipeChoose':
				form = <EquipeChoose redirectTo={this.handleRedirect} />;
				break;

			case 'fileAttente':
				form = <FileAttente redirectTo={this.handleRedirect} />;
				break;

			default:
				form = <Home redirectTo={this.handleRedirect} />;
				break;
		}

		return (
			<Container center blur={this.state.blurBackground} >
				{form}
			</Container>
		)
	}
}