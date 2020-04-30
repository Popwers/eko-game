import styled, { css } from 'styled-components';
import imgPlat from '../../public/images/jeu/plateau.svg';
import imgTerre from '../../public/images/jeu/planisphere.svg';
import { CenterDiv } from '../design/designComponents';

const ImgPlateau = styled.img`
    width: 40%;
`

const Terre = styled.div`
    position: absolute;
    width: 180px;
    height: 180px;
    border-radius: 300px;
    overflow: hidden;
    background: ${props => props.theme.bleuFonce};

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.3;
        background: -moz-linear-gradient(-145deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.6) 100%);
        background: -webkit-linear-gradient(-145deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.6) 100%);
        background: linear-gradient(-145deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.6) 100%);
        mix-blend-mode: hard-light;
    }
`

const TerreContainer = styled.img`
    height: 100%;
    position: absolute;
    left: 0px;
    animation: rotatePlanet 60s infinite linear;

    @keyframes rotatePlanet {
        0% {
            left: -130px;
        }

        100% {
            left: -794px;
        }
    }
`

export default function Plateau(props) {
    return (
        <CenterDiv>
            <ImgPlateau src={imgPlat} />
            <Terre>
                <TerreContainer src={imgTerre} />
            </Terre>
        </CenterDiv>
    );
}