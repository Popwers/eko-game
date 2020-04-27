import Logo from "../UI/LogoEko";
import ButtonNav from "../UI/ButtonNav";
import Input from "../UI/Input";
import Label from "../UI/Label";
import NbrJoueurs from "../UI/IndiceNbrJoueurs";
import { Spacer } from '../design/designComponents';

export default (props) => {
    return (
        <>
            <Spacer>
                <Logo />
            </Spacer>

            <Spacer>
                <NbrJoueurs
                    JoueursCo={2}
                    // nbrJoueursTotal={6}
                />
            </Spacer>
            

        </>
    );
}

