import Logo from "../UI/LogoEko";
import NbrJoueurs from "../UI/IndiceNbrJoueurs";
import TitrePage from "../UI/TitrePage";
import ListeEquipe from "../UI/ListeEquipe";
import { Spacer, Hr } from '../design/designComponents';

export default (props) => {
    return (
        <>
            <NbrJoueurs
                JoueursCo={props.NbrJoueursCo}
                JoueursTotal={props.NbrJoueursMax}
            />

            <Spacer>
                <Logo />
            </Spacer>

            <Spacer>
                <TitrePage
                    codeRoom={props.codeRoom}
                />
                <Hr/>
            </Spacer>

            <Spacer>
                <ListeEquipe nombreJoueursMax={props.NbrJoueursMax} />
            </Spacer>
        </>
    );
}

