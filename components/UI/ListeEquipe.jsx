import { Spacer, Col } from '../design/designComponents';
import styled, { css } from 'styled-components';
import Eclair from '../../public/images/eclair.svg'

const ContainerListes = styled.div`
    width:70%;
    margin: 0 auto;
`

const Liste = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
    color: ${props => props.theme.white};
    font-size: 1.6rem; 
`

const Li = styled.li`
    padding: 10px 0;
`
const Separateur = styled.img`
    width: 20%;
`

const TitreListeE = styled.p`
    color: ${props => props.theme.greenFonce};
    font-size: 1.6rem;
    font-family: ${props => props.theme.primaryFont};
    background-color: ${props => props.theme.white}; 
    padding: 2px;
    border-radius: 20px;    
`

const TitreListeP = styled.p`
    color: ${props => props.theme.bleuFonce};
    font-size: 1.6rem;
    font-family: ${props => props.theme.primaryFont};
    background-color: ${props => props.theme.white}; 
    padding: 2px;
    border-radius: 20px;
    
`

export default function ListeEquipe(props){
    return(
        <ContainerListes>
            <Col dividCol={3}>
                <TitreListeE>
                    Les Ecolos
                </TitreListeE>
                <Liste>
                    <Li>Lionel</Li>
                    <Li>Rohan</Li>
                    <Li>...</Li>
                    <Li>...</Li>                    
                </Liste>
            </Col>
            <Col dividCol={3}>
                <Separateur src={Eclair}/>
            </Col>
            <Col dividCol={3}>
                <TitreListeP>
                    Les Pollueurs
                </TitreListeP>
                <Liste>
                    <Li>Valentin le faible</Li>
                    <Li>Fé bour Clodi</Li>
                    <Li>...</Li>
                    <Li>...</Li> 
                </Liste>
            </Col>
        </ContainerListes>
    )
}