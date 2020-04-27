import styled, { css } from "styled-components";

const ButtonEquipe = styled.img`
    position: fixed;
    bottom: -15vh;
    height: 65vh;
    min-height: 500px;
    cursor: pointer;
    transform-origin: center bottom;
    transition: bottom 0.5s;

    &:hover {
        bottom: -8vh;
    }

    &:active {
        bottom: -11vh;
    }

    animation-duration: 10s;
    animation-name: animateMain;
    animation-iteration-count: infinite;

    @keyframes animateMain {
        0% {
            transform: rotate(0deg);
        }

        25% {
            transform: rotate(3deg);
        }

        75% {
            transform: rotate(-3deg);
        }

        100% {
            transform: rotate(0deg);
        }
    }

    ${props => 
        props.equipe == 'ecologiste' &&
        css`
            animation-delay: 0.8s;
            left: 4vw;  
            `};

    ${props =>
        props.equipe == 'pollueur' &&
        css`
            right: 4vw;  
            `};

    ${props =>
        props.initChoose == props.equipe &&
        css`
            bottom: -10vh;
        `};
`

export default function ButtonChoixEquipe(props) {
    function handleClick(event) {
        props.onClick(props.equipe);
    }

    return(
        <ButtonEquipe
            equipe={props.equipe}
            src={props.src}
            onClick={handleClick}
            initChoose={props.initChoose}
        />
    )
}