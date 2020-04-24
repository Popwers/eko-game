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
                    label="Pseudo"
                    placeholder='Pseudo'
                    type='text'
                    top
                />
            </Spacer>
            
            <Spacer>
                <Label name="Mode" top>
                    <ButtonNav
                        to='Test'
                        action={props.redirectTo}
                        name='Public'
                        big
                    />

                    <ButtonNav
                        to='test'
                        action={props.redirectTo}
                        name='Privé'
                        big
                    />
                </Label>
            </Spacer>
        </>
    );
}

