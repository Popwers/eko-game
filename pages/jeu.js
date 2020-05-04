import React from 'react';
import { withRouter } from 'next/router'
import Container from "../components/layout/Container";
import NbrTours from "../components/UI/IndiceNbrTours";
import Chrono from "../components/UI/IndiceChrono";
import Plateau from "../components/UI/Plateau";
import Carte from "../components/UI/Carte";
import { Spacer, WhiteLabel, PetitTitre } from '../components/design/designComponents';
import SocketClient from "../lib/socketClient";

class Jeu extends React.Component {

    /* Définis les props initiales */
    static defaultProps = {
        initialeEquipe: [],
        initialeNombreTours: 4,
        initialenombreJoueurCo: 0,
        initialeNombreJoueurMaxs: 4,
        initialCodePrivateRoom: null,
        initialPseudo: null,
        initialList: [],
        initialList: [],
    }

    constructor(props) {
        super(props);
        this.state = {
            statut: null,
            equipeChoose: props.initialeEquipe,
            nombreTourMax: props.initialeNombreTours,
            nombreJoueurCo: props.initialenombreJoueurCo,
            nombreJoueurMax: props.initialeNombreJoueurMaxs,
            codePrivateRoom: props.initialCodePrivateRoom,
            pseudo: props.initialPseudo,
            listEcolos: props.initialList,
            listPollueurs: props.initialList,
        };

        this.socketClient = new SocketClient();
    }

    /* A la création du composant attache l'événement 'popstate' pour gérer le retour navigateur */
    componentDidMount() {
        this.setState({
            codePrivateRoom: this.props.router.query.codePartie,
            pseudo: this.props.router.query.pseudo,
        });

        this.socketClient.subscribeConnexion((data) => {
            this.setState({
                statut: data,
            });

            const dataToServer = { name: this.state.pseudo, code: this.state.codePrivateRoom };
            return dataToServer;
        });
    }

    render() {
        return (
            <Container center>
                <h1>statut: {this.state.statut}</h1>
                <NbrTours 
                    tours={3}
                    toursTotal={6}
                />
                <Chrono chrono={30} />
                <Spacer>
                    <PetitTitre>
                        C'est au tour de
                    </PetitTitre>
                    <WhiteLabel>
                        Quentin le roux
                    </WhiteLabel>
                </Spacer>

                <Spacer>
                    <Plateau />
                </Spacer>

                <Carte

                   
                />

            </Container>
        )
    }
}

export default withRouter(Jeu);