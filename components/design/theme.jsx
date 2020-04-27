import styled, { css } from 'styled-components';

export const theme = {
    whiteTrans: 'rgba(255, 255, 255, 0.5)',
    white: '#FFF',
    bleuFonce: '#1B3035',
    bleu: '#577A7C',
    bleuClaire: '#80AAAA',
    greenFonce: '#6EAA43',
    green: '#99B772',
    greenClaire: '#C4D69D',
    primaryFont: "'Chewy', cursive",
    secondaryFont: "'Josefin Sans', sans-serif", 
};

export const RootApp = styled.div`
    position: relative;
    z-index: 1;
    height: 100vh;

    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-transform: translate3d(0,0,0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0,0,0);
    transform: translateZ(0);
    
    ${props =>
        props.center &&
        css`
            display: flex;
            text-align: center;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `}
`