import styled from 'styled-components';
import Label from "./Label";

const divCheck = styled.div`
    display: flex;

`


const CheckBox = styled.input`
    
`

export default function InputCheck(props) {
    return (

        <Label name={props.label} top={props.top}>

            <Label name='4'>

                <CheckBox type='checkbox' value='4' />

            </Label>

            <Label name='6'>

                <CheckBox type='checkbox' value='4' />

            </Label>

            <Label name='8'>

                <CheckBox type='checkbox' value='4' />
                
            </Label>

        </Label>
        
    )
}
