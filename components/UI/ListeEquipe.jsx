import { Col } from '../design/designComponents';
import styled from 'styled-components';
import Eclair from '../../public/images/eclair.svg';
import Liste from '../UI/Liste';

const ContainerListes = styled.div`
    width: 70%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Separateur = styled.img`
    height: 200px;
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

const ColCenter = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function ListeEquipe(props){
    return(
        <ContainerListes>
            <Col dividCol={3}>
                <TitreListeE>
                    Les Ecolos
                </TitreListeE>
                <Liste array={props.array} nbrJoueursMax={props.nombreJoueursMax} />
            </Col>
            <ColCenter dividCol={3}>
                <Separateur src={Eclair}/>
            </ColCenter>
            <Col dividCol={3}>
                <TitreListeP>
                    Les Pollueurs
                </TitreListeP>
                <Liste array={props.array} nbrJoueursMax={props.nombreJoueursMax} />
            </Col>
        </ContainerListes>
    )
}