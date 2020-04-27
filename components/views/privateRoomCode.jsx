import Logo from "../UI/LogoEko";
import ButtonNav from "../UI/ButtonNav";
import Input from "../UI/Input";
import { Spacer, ContainerDiv, LittleLabel } from '../design/designComponents';

export default (props) => {
    return (
        <>
            <Spacer>
                <Logo />
            </Spacer>

            <Spacer>
                <ContainerDiv size={30}>
                    <Input
                        label="Code de votre partie"
                        type='text'
                        initVal={props.initInput}
                        readOnly
                        top
                    />
                    <LittleLabel>Cliquer pour copier</LittleLabel>
                </ContainerDiv>
            </Spacer>
            
            <Spacer>
                <ButtonNav
                    to='equipeChoose'
                    action={props.redirectTo}
                    name='Choix du camp'
                    big
                />
            </Spacer>
        </>
    );
}

