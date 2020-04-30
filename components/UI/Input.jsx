import styled, { css } from 'styled-components';
import Label from "./Label";

const InputText = styled.input`
    border: 4px solid ${props => props.theme.bleuFonce};
    width: ${props => props.width ? props.width + 'px' : '100%'};
    height: ${props => props.height ? props.height + 'px' : 'initiale'};
    box-sizing: border-box;
    margin-bottom: 2px;
    padding: 5px 10px;
    text-align:center;    
    background-color: ${props => props.theme.whiteTrans};
    border-radius: 8px;
    font-size: 1rem;
    box-shadow: 0px 4px 8px #00000054;
    transition: border 0.5s, transform 0.3s;

    &:active, &:focus {
        border: 4px solid ${props => props.theme.bleuClaire};
    }

    ${props =>
        props.cssReadOnly &&
        css`
            border: 4px solid ${props => props.theme.white};
        	background: transparent;
            color: ${props => props.theme.white};
            font-size: 2rem;
            cursor: pointer;

            &:active {
                transform: scale(0.9);
            }
        `};
`

export default function Input(props) {
    function handleChange(event) {
        if (props.onValueUpdate) props.onValueUpdate(event.target.value);
    }

    function handleClick(event) {
        if (props.readOnly) {
            event.target.select();
            document.execCommand('copy');
            return false;
        }
    }

    return (
        <Label name={props.label} top={props.top}>
            <InputText 
                width={props.width}
                height={props.height}
                cssReadOnly={props.readOnly}
                value={props.initVal !== null ? props.initVal : ''} 
                placeholder={props.placeholder} 
                type={props.type}
                onClick={handleClick}
                onChange={handleChange} />
        </Label>
    )
}
