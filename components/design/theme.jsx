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
};

export const RootApp = styled.div`
    position: relative;
    z-index: 1;
    height: 100vh;
    
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