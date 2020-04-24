import Container from "../layout/Container";
import Logo from "../UI/LogoEko";
import ButtonNav from "../UI/ButtonNav";
import Input from "../UI/Input";
import Label from "../UI/Label";
import { Spacer } from '../design/designComponents';

export default () => {
    return (
        <Container center>
            <Spacer>
                <Logo src='./images/logo.svg' />
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
                        to='/test'
                        name='Public'
                        big
                    />

                    <ButtonNav
                        to='/privateChose'
                        name='Privé'
                        big
                    />
                </Label>
            </Spacer>
        </Container>
    );
}

