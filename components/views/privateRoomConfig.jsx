import Logo from "../UI/LogoEko";
import ButtonNav from "../UI/ButtonNav";
import CheckBoxes from "../UI/CheckBoxes";
import RangeSlider from "../UI/RangeSlider";
import { Spacer } from '../design/designComponents';

export default (props) => {
    return (
        <>
            <Spacer>
                <Logo />
            </Spacer>

            <Spacer>
                <CheckBoxes label='Nombre de joueurs max' top/>
            </Spacer>

            <Spacer>
                <RangeSlider label='Nombre de tours' top/>
            </Spacer>
            
            <Spacer>
                <ButtonNav
                    to='privateRoomCode'
                    action={props.redirectTo}
                    name='Créer'
                    big
                />
            </Spacer>
        </>
    );
}

