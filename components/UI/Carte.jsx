import styled, { css } from 'styled-components';
import CarteDos from '../../public/images/jeu/dos_carte.svg';
import Quizz from './Quizz';

// rotation: 0;

const ContainerCarte = styled.div`
    position: absolute;
    top: 30vh;
    z-index: 20;
    width:278px;
    height: 454px;
    perspective: 1000px;
    border-radius: 10px;
`

let InnerCarte = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform: rotateY(${props => props.rotation}deg);
    transform-style: preserve-3d;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 10px;
`

const DosCarte = styled.div`
    background: url(${CarteDos});
    border-radius: 10px;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
`

//url(${props => props.CarteColor})

const FaceCarte = styled.div`
    background: ${props => props.theme.greenClaire};
    border-radius: 10px;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: rotateY(180deg);
`



export default function Carte(props){

    let rot = 180;

    function flip() {
        // rot = 180;
        // alert(rot);
        
    }

    let question = "Pour produire de l'électricité il faut :";

    let reponses = ['Un aimant', 'Une bobine de cuivre', "Un mouvement (de l'énergie cinétique)", "de l'énergie de position"];    
    

    return(
       

        <ContainerCarte>

            <InnerCarte rotation={rot} >

                <DosCarte  onClick={flip}/>

                <FaceCarte>
                    <Quizz
                    question = {question}

                    reponse1 = {reponses[0]}
                    reponse2 = {reponses[1]}
                    reponse3 = {reponses[2]}
                    reponse4 = {reponses[3]}
                    />
                </FaceCarte>

            </InnerCarte>

        </ContainerCarte>
    )
}