import styled from 'styled-components';
import Label from "./Label";

const InputText = styled.input`
    border: 4px solid ${props => props.theme.bleuFonce};
    width: 300px;
    margin-bottom: 2px;
    padding: 5px 10px;
    text-align:center;    
    background-color: ${props => props.theme.whiteTrans};
    border-radius: 8px;
    font-size: 1rem;
    box-shadow: 0px 4px 8px #00000054;
    transition: border 0.5s;

    &:active, &:focus {
        border: 4px solid ${props => props.theme.bleuClaire};
    }
`

export default function Input(props) {
    function handleChange(event) {
        if (props.onValueUpdate) props.onValueUpdate(event.target.value);
    }

    return (
        <Label name={props.label} top={props.top}>
            <InputText value={props.initVal !== null ? props.initVal : ''} placeholder={props.placeholder} type={props.type} onChange={handleChange}/>
        </Label>
    )
}
