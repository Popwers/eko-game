import { Titre, SpanDarkBlue } from '../design/designComponents';
import Input from '../UI/Input';
import styled from 'styled-components';

const TitreSpe = styled(Titre)`
    label {
        margin-left: 10px;
    }
`

export default function TitrePage(props){
    return(
        <TitreSpe>
            <SpanDarkBlue>
                File d'attente &nbsp;
            </SpanDarkBlue>
            Partie
            {props.codeRoom != null &&
                <Input
                    type='text'
                    initVal={props.codeRoom}
                    readOnly
                    top
                    width={130}
                    height={50}
                />
            }
        </TitreSpe>
    )
}