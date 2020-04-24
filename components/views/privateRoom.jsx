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
                <Label name="Rejoindre une partie" top>
                    <Input
                        onValueUpdate={props.changeCodePrivateRoom}
                        initVal={props.initInput}
                        placeholder="Code de la room"
                        type='text'
                    />
                    <ButtonNav
                        to='fileAttente'
                        action={props.redirectTo}
                        name='Jouer'
                        disabled={props.buttonStat}
                    />
                </Label>

                <Label name="Ou" top>
                    <ButtonNav
                        to='privateRoomConfig'
                        action={props.redirectTo}
                        name='Créer une partie'
                        big
                    />
                </Label>
            </Spacer>
        </>
    );
}

