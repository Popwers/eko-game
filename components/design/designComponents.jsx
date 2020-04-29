import styled, { css } from 'styled-components';

export const CenterDiv = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Spacer = styled.div`
    display: inline-block;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
`

export const LinkStyle = styled.a`
    width: ${props => props.size !== null ? props.size + '%' : null};
    display: inline-block;
    text-decoration: none;
    color: ${props => props.theme.bleuFonce};
    font-size: 1rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    padding: 10px 20px;
    background: ${props => props.theme.white};
    letter-spacing: 0.7px;
    margin: 10px;
    box-sizing: border-box;
    transition: color 0.3s, transform 0.3s, opacity 0.3s;

    &:hover {
        transform: scale(1.1);
        color: ${props => props.theme.green};
    }

    &:active {
        transform: scale(0.9);
        background: ${props => props.theme.greenFonce};
        color: ${props => props.theme.white};
    }

    ${props =>
        props.disabled &&
        css`
        	opacity: 0.3;
            pointer-events: none;
        `};

    ${props =>
        props.big &&
        css`
        	font-size: 1.3rem;
            padding: 30px;
        `};
`

export const Col = styled.div`
    display: inline-block;
    width: calc(100% / ${props => props.dividCol} );
    box-sizing: border-box;
`

export const ContainerDiv = styled.div`
    width: ${props => props.size}%;
    box-sizing: border-box;
    margin: 0 auto;
`

export const LittleLabel = styled.p`
    color: ${props => props.theme.white};
    font-size: 0.7rem;
    font-family: ${props => props.theme.secondaryFont};
`
export const DarkLabel = styled.p`
    color: ${props => props.theme.bleuFonce};
    font-size: 1.6rem;
    margin: 5px 0;
    font-family: ${props => props.theme.primaryFont};
`

export const WhiteLabel = styled.p`
    color: ${props => props.theme.white};
    font-size: 2rem;
    margin: 0;
    font-family: ${props => props.theme.primaryFont};
`

export const Titre = styled.h1`
    color: ${props => props.theme.white};
    font-size: 2rem;
    font-family: ${props => props.theme.primaryFont};
`

export const SpanDarkBlue = styled.span`
    font-size: 2.5rem;
    color: ${props => props.theme.bleuFonce};
    font-family: ${props => props.theme.primaryFont};
`
export const ContainerIndice = styled.div`
    position: fixed;
    z-index: 10;
    top: 2%;
    left: 3%;
`
 export const Hr = styled.hr`
        background-color: ${props => props.theme.white};
        width: 15%;
        margin: 0 auto;
 `