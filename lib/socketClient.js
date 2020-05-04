import io from "socket.io-client";

export default class SocketClient {
    constructor() {
        // Connexion avec le serveur
        this.socket = io();
    }

    checkPseudo = (pseudo, callBack) => {
        this.socket.emit('checkPseudo', pseudo, data => callBack(data));
    }

    deletePseudo = (pseudo) => {
        this.socket.emit('leavePseudo', pseudo);
    }

    subscribeConnexion = (callBack) => {
        this.socket.on('connexion', (data, callBackToServer) => {
            const dataReturned = callBack(data);
            callBackToServer(null, dataReturned);
        });
    }

    subscribePlayersStats = (callBack) => {
        this.socket.on('playerLeave', data => callBack(data));
        this.socket.on('newPlayer', data => callBack(data));
    }

    subscribeGameReady = (callBack) => {
        this.socket.on('gameReady', callBack);
    }

    startPublicPartie = (pseudo, equipe, callBack) => {
        const player = {name: pseudo, equipe: equipe};
        this.socket.emit('joinPublicGame', player, data => callBack(data));
    }

    startPrivatePartie = (pseudo, equipe, code, callBack) => {
        const player = { name: pseudo, equipe: equipe, code: code };
        this.socket.emit('joinPrivateGame', player, data => callBack(data));
    }

    leaveGame = (pseudo) => {
        this.socket.emit('leaveGame', pseudo);
    }
}