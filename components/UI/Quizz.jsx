import styled, { css } from 'styled-components';
import { LinkStyle, Spacer } from '../design/designComponents';

const Li = styled.li`
    list-style:none;
`

const Question = styled.p`
    color: ${props => props.theme.white};
    font-size: 1.3rem;
    font-family: ${props => props.theme.primaryFont};
    margin-top: 10px;
`

const Ul = styled.ul`
    margin: 0;
    padding: 0;
`

const TitreCarte = styled.p`
    color: ${props => props.theme.bleuFonce};
    font-size: 2rem;
    font-family: ${props => props.theme.primaryFont};
    margin: 0 0 25px 0;
`

export default function Quizz(props){
    return(
        <div>
            <Spacer>
                <TitreCarte>Quizz</TitreCarte>
                <Question>{props.question}</Question>   
                <Ul>
                    <Li><LinkStyle size={90}>{props.reponse1}</LinkStyle></Li>
                    <Li><LinkStyle size={90}>{props.reponse2}</LinkStyle></Li>
                    <Li><LinkStyle size={90}>{props.reponse3}</LinkStyle></Li>
                    <Li><LinkStyle size={90}>{props.reponse4}</LinkStyle></Li>
                
                </Ul>
            </Spacer>
            
        </div>
    )
}