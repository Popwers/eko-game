import styled from 'styled-components';

const LabelStyled = styled.span`
    display: ${props => props.top ? 'block' : 'initiale'};
    margin: ${props => props.noMargin ? '0px' : '15px'};
    font-size: 1.6rem;
    color: ${props => props.theme.white};
`

export default function Label(props) {
    return (
        <label>
            <LabelStyled noMargin={props.noMargin} top={props.top}>{props.name}</LabelStyled>
            {props.children}
        </label>
    )
}
