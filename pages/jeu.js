import React from 'react';

export default class Jeu extends React.Component {

    /* Définis les props initiales */
    static defaultProps = {
    }

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /* A la création du composant attache l'événement 'popstate' pour gérer le retour navigateur */
    componentDidMount() {
        //window.addEventListener("popstate", this.handlePopState);
    }

    render() {
        return (
            <h1>Hello ROhan</h1>
        )
    }
}