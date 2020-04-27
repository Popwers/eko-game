import { Titre, SpanDarkBlue} from '../design/designComponents';

export default function TitrePage(props){
    return(
        <Titre>
            
            <SpanDarkBlue>
                File d'attente &nbsp;
            </SpanDarkBlue>
            Partie {props.codeRoom}
        </Titre>
    )
}