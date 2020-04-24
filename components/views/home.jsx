import Logo from "../UI/LogoEko";
import ButtonNav from "../UI/ButtonNav";
import Input from "../UI/Input";
import Label from "../UI/Label";
import { Spacer } from '../design/designComponents';

export default (props) => {
    return (
        <>
            <Spacer>
                <Logo />
            </Spacer>

            <Spacer>
                <Input
                    onValueUpdate={props.checkPseudo}
                    initVal={props.initInput}
                    label="Pseudo"
                    placeholder='Pseudo'
                    type='text'
                    top
                />
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

