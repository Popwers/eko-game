export default function NbrJoueurs(props){
    return(
        <div>
            <span id='labelNbrJoueurs'>Nombres de joueurs</span>
            <span id='valueNbrJoueurs'>{props.JoueursCo} / 6</span>
        </div>
    )
}