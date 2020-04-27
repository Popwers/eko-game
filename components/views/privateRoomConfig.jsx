import Logo from "../UI/LogoEko";
import ButtonNav from "../UI/ButtonNav";
import CheckBoxes from "../UI/CheckBoxes";
import RangeSlider from "../UI/RangeSlider";
import { Spacer, ContainerDiv } from '../design/designComponents';

export default (props) => {
    return (
        <>
            <Spacer>
                <Logo />
            </Spacer>

            <Spacer>
                <CheckBoxes handleChangeVal={props.changeJoueursMax} setChecked={props.initCheck} label='Nombre de joueurs max' top/>
            </Spacer>

            <Spacer>
                <ContainerDiv size={40}>
                    <RangeSlider handleChangeVal={props.changeTourMax} setInitRange={props.initRange} label='Nombre de tours' top />
                </ContainerDiv>
            </Spacer>
            
            <Spacer>
                <ButtonNav
                    to='privateRoomCode'
                    action={props.redirectTo}
                    name='Créer'
                    size={10}
                />
            </Spacer>
        </>
    );
}

