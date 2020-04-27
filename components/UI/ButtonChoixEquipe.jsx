import styled, { css } from "styled-components";

const ButtonEquipe = styled.img`
    

    ${props =>
        props.initChoose &&
        css`
            
        `};
`

export default function ButtonChoixEquipe(props) {
    function handleClick(event) {
        props.onClick(props.equipe);
    }

    return(
        <ButtonEquipe 
            src={props.src} 
            onClick={handleClick} 
            initChoose={props.initChoose} 
        />
    )
}