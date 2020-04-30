import styled from 'styled-components';

const LabelStyled = styled.span`
    display: ${props => {if (props.name) {
                            if (props.top) {
                                return 'block';
                            } else {
                                return 'initiale';
                            }
                        } else {
                            return 'none';
                        }}};
    margin: ${props => props.noMargin ? '0px' : '15px'};
    font-size: 1.6rem;
    color: ${props => props.theme.white};
`

export default function Label(props) {
    return (
        <label>
            <LabelStyled noMargin={props.noMargin} top={props.top} name={props.name} >{props.name}</LabelStyled>
            {props.children}
        </label>
    )
}
