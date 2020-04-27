import styled from 'styled-components';
import Label from "./Label";
import {useState} from 'react';

const SliderStyle = styled.input`
    -webkit-appearance: none; 
    appearance: none;
    width: 100%;
    height: 8px;
    border-radius: 8px; 
    outline: none;
    background: ${props => props.theme.white};         
    box-sizing: border-box;
    cursor: pointer;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        outline: none;
        width: 15px;
        height: 15px;
        border: 3px solid ${props => props.theme.bleuFonce};
        border-radius: 20px;
        background: ${props => props.theme.white};
        transition: transform 0.3s;
        &:hover {
            transform: scale(1.2);
        }
    }

    &::-moz-range-thumb {
        outline: none;
        width: 15px;
        height: 15px;
        border: 3px solid ${props => props.theme.bleuFonce};
        border-radius: 20px;
        background: ${props => props.theme.white};
        transition: transform 0.3s;
        &:hover {
            transform: scale(1.2);
        }
    }

    &::-ms-thumb {
        outline: none;
        width: 15px;
        height: 15px;
        border: 3px solid ${props => props.theme.bleuFonce};
        border-radius: 20px;
        background: ${props => props.theme.white};
        transition: transform 0.3s;
        &:hover {
            transform: scale(1.2);
        }
    }
`

const NumberContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

export default function RangeSlider(props) {
    const [range, setRange] = useState(props.setInitRange)

    function handleChange(event) {
        if (props.handleChangeVal) props.handleChangeVal(Number(event.target.value));
        setRange(Number(event.target.value));
    }

    return (
        <Label name={props.label} top={props.top}>
            <NumberContainer>
                <Label noMargin name='2'/>
                <Label noMargin name='3' />
                <Label noMargin name='4' />
                <Label noMargin name='5' />
                <Label noMargin name='6' />
            </NumberContainer>
            <SliderStyle type='range' min="2" max="6" value={range} onChange={handleChange} />
        </Label>
    )
}
