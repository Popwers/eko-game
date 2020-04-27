import { DarkLabel, WhiteLabel} from '../design/designComponents';
import Label from '../UI/Label';

export default function NbrJoueurs(props){
    return(
        <div>
            <DarkLabel id='labelNbrJoueurs'>Nombres de joueurs</DarkLabel>
            <WhiteLabel id='valueNbrJoueurs'> {props.JoueursCo} / {props.JoueursTotal} </WhiteLabel>
        </div>
    )
}