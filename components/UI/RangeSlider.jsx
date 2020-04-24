import styled from 'styled-components';
import Label from "./Label";

const InputSlider = styled.input`

    -webkit-appearance: none;
    width: 100%;
    height: 4px;
    background: ${props => props.theme.white};
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
    border-radius: 3px;

    &:hover{
        opacity:1;
    }

    &::-webkit-slider-thumb{
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 10px;
        background: black;
        cursor: pointer;
        border-radius: 10px;
        border: solid 3px white;
    }
    
`

export default function RangeSlider(props) {
    return (
        <Label name={props.label} top={props.top}>
            <InputSlider type='range' min="2" max="6" value="4" />
        </Label>
    )
}
