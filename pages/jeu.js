import React from 'react';
import Container from "../components/layout/Container";
import NbrTours from "../components/UI/IndiceNbrTours";
import Chrono from "../components/UI/IndiceChrono";
import Plateau from "../components/UI/Plateau";
import Carte from "../components/UI/Carte";
import { Spacer, WhiteLabel, PetitTitre } from '../components/design/designComponents';


export default class Jeu extends React.Component {

    /* Définis les props initiales */
    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    /* A la création du composant attache l'événement 'popstate' pour gérer le retour navigateur */
    componentDidMount() {
        //window.addEventListener("popstate", this.handlePopState);
    }

    render() {
        return (
            <Container center>
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