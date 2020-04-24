import Logo from "../UI/LogoEko";
import ButtonNav from "../UI/ButtonNav";
import Input from "../UI/Input";
import Label from "../UI/Label";
import { Spacer, ContainerDiv } from '../design/designComponents';

export default (props) => {
    return (
        <>
            <Spacer>
                <Logo />
            </Spacer>

            <Spacer>
                <ContainerDiv size={40}>
                    <Input
                        onValueUpdate={props.checkPseudo}
                        initVal={props.initInput}
                        label="Pseudo"
                        placeholder='Pseudo'
                        type='text'
                        top
                    />
                </ContainerDiv>
            </Spacer>
            
            <Spacer>
                <Label name="Mode" top>
                    <ButtonNav
                        to='fileAttente'
                        action={props.redirectTo}
                        name='Public'
                        disabled={props.buttonStat}
                        big
                    />

                    <ButtonNav
                        to='privateRoom'
                        action={props.redirectTo}
                        name='Privé'
                        disabled={props.buttonStat}
                        big
                    />
                </Label>
            </Spacer>
        </>
    );
}

