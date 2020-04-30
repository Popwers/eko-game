import { WhiteLabel } from '../design/designComponents';
import Label from '../UI/Label';
import styled, { css } from 'styled-components';

const IndiceChrono = styled.div`
    position: fixed;
    z-index: 10;
    top: 2%;
    right: 3%;
`

export default function Chrono(props){
    return(
        <IndiceChrono>
            <WhiteLabel>{props.chrono}&nbsp;s</WhiteLabel>
        </IndiceChrono>
    )
}