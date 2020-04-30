import { DarkLabel, WhiteLabel, ContainerIndice} from '../design/designComponents';
import Label from '../UI/Label';
import styled, { css } from 'styled-components';


export default function NbrTours(props){
    return(
        <ContainerIndice>
            <DarkLabel id='labelNbrJoueurs'>Nombres de tours</DarkLabel>
            <WhiteLabel id='valueNbrJoueurs'> {props.tours} / {props.toursTotal} </WhiteLabel>
        </ContainerIndice>
    )
}