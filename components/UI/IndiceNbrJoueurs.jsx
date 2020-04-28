import { DarkLabel, WhiteLabel, ContainerIndice} from '../design/designComponents';
import Label from '../UI/Label';
import styled, { css } from 'styled-components';


export default function NbrJoueurs(props){
    return(
        <ContainerIndice>
            <DarkLabel id='labelNbrJoueurs'>Nombres de joueurs</DarkLabel>
            <WhiteLabel id='valueNbrJoueurs'> {props.JoueursCo} / {props.JoueursTotal} </WhiteLabel>
        </ContainerIndice>
    )
}