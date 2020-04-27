import styled, {css} from 'styled-components';

import illustration_ecolo from "../../public/images/illustration_ecolo.svg";
import nuage from "../../public/images/nuage.svg";
import illustration_pollueur from "../../public/images/illustration_pollueur.svg";
import fumee from "../../public/images/fumee.svg";
import nuage_fumee1 from "../../public/images/nuage_fumee1.svg";
import nuage_fumee2 from "../../public/images/nuage_fumee2.svg";

const StyledBackground = styled.div`
    position: fixed;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;

    &:after {
        content: '';
        opacity: 0;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.3);
        transition: opacity 0.5s;
    }

    div {
        position: relative;
        height: 100%;
        width: 100%;
    }

    img {
        position: absolute;
    }

    #illustration_ecolo,
    #illustration_pollueur {
        animation-duration: 6s;
        animation-name: animateY;
        animation-iteration-count: infinite;
        width: 350px;
    }

    #illustration_pollueur {
        right: 0;
        top: 38.7%;
    }

    #illustration_ecolo {
        left: 0;
        top: 30%;
    }

    #nuage1 {
        animation-delay: 1s;
        animation-duration: 6s;
        animation-name: animateY;
        animation-iteration-count: infinite;
        width: 50px;
        top: 15%;
        left: 20px;
    }

    #nuage2 {
        animation-delay: 0.4s;
        animation-duration: 6s;
        animation-name: animateY;
        animation-iteration-count: infinite;
        width: 70px;
        top: 30%;
        left: 50px;
    }

    #nuage3 {
        animation-delay: 1s;
        animation-duration: 6s;
        animation-name: animateY;
        animation-iteration-count: infinite;
        width: 100px;
        top: 20%;
        left: 130px;
    }

    #fumee1 {
        animation-duration: 6s;
        animation-name: animateOp;
        animation-iteration-count: infinite;
        width: 120px;
        right: 30px;
        top: 30%;
    }

    #fumee2 {
        animation-duration: 6s;
        animation-name: animateOp;
        animation-iteration-count: infinite;
        width: 145px;
        top: 25%;
        right: 75px;
    }

    #nuage_fumee1 {
        animation-delay: 0.5s;
        animation-duration: 6s;
        animation-name: animateY;
        animation-iteration-count: infinite;
        width: 120px;
        top: 37%;
        right: 215px;
    }

    #nuage_fumee2 {
        animation-delay: 1s;
        animation-duration: 6s;
        animation-name: animateY;
        animation-iteration-count: infinite;
        width: 110px;
        right: 15px;
        top: 20%;
    }

    @keyframes animateY {
        0% {
            transform: translateY(0px);
        }

        50% {
            transform: translateY(20px);
        }

        100% {
            transform: translateY(0px);
        }
    }

    @keyframes animateOp {
        0% {
            transform: translateY(0px);
            opacity: 1;
        }

        50% {
            transform: translateY(20px);
            opacity: 0.6;
        }

        100% {
            transform: translateY(0px);
            opacity: 1;
        }
    }

    ${props =>
        props.blur &&
        css`
        	&:after {
                opacity: 1;
            }
        `};
`;

export default function Background(props) {
    return (
        <StyledBackground blur={props.blur}>
            <div>
                <img id="illustration_ecolo" src={illustration_ecolo} />
                <img id="nuage1" src={nuage} />
                <img id="nuage2" src={nuage} />
                <img id="nuage3" src={nuage} />
            </div>

            <div>
                <div>
                    <img id="illustration_pollueur" src={illustration_pollueur} />
                    <img id="fumee1" src={fumee} />
                    <img id="fumee2" src={fumee} />
                </div>
                <img id="nuage_fumee1" src={nuage_fumee1} />
                <img id="nuage_fumee2" src={nuage_fumee2} />
            </div>
        </StyledBackground>
    )
}