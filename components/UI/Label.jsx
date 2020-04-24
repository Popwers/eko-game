import styled from 'styled-components';

const LabelStyled = styled.span`
    display: ${props => props.top ? 'block' : 'initiale'};
    margin: 15px;
    font-size: 1.6rem;
    color: ${props => props.theme.white};
`

export default function Label(props) {
    return (
        <label>
            <LabelStyled top={props.top}>{props.name}</LabelStyled>
            {props.children}
        </label>
    )
}
