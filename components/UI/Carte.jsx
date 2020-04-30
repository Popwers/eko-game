import styled, { css } from 'styled-components';
import CarteDos from '../../public/images/jeu/dos_carte.svg';

// rotation: 0;

const ContainerCarte = styled.div`
    width:139px;
    height: 227px;
    perspective: 1000px;
    border-radius: 10px;
`

const InnerCarte = styled.div`
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

const FaceCarte = styled.div`
    background: url(${props => props.CarteColor});
    border-radius: 10px;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transform: rotateY(180deg);
`



export default function Carte(props){

    function flip(){
    //    rotation = 180;
    }


    return(
       

        <ContainerCarte>

            <InnerCarte>

                <DosCarte  onClick={flip}/>

                <FaceCarte>
                </FaceCarte>

            </InnerCarte>

        </ContainerCarte>
    )
}