import Logo from "../UI/LogoEko";
import ButtonNav from "../UI/ButtonNav";
import Input from "../UI/Input";
import Label from "../UI/Label";
import { Spacer, Col, ContainerDiv } from '../design/designComponents';
import styled from "styled-components";

const LabelBarre = styled(Label)`
    &:before {
        content: '';
        background: $(props => props.themes.white);
        position: absolute;
        width: 100%;
        height: 1px;
        top: 0;
    }
`

export default (props) => {
    return (
        <>
            <Spacer>
                <Logo />
            </Spacer>

            <Spacer>
                <Label name="Rejoindre une partie" top>
                    <ContainerDiv size={50}>
                        <Col dividCol={2}>
                            <Input
                                onValueUpdate={props.changeCodePrivateRoom}
                                initVal={props.initInput}
                                placeholder="Code de la room"
                                type='text'
                            />
                            
                        </Col>
                        <Col dividCol={3}>
                            <ButtonNav
                                size={100}
                                to='equipeChoose'
                                action={props.redirectTo}
                                name='Jouer'
                                disabled={props.buttonStat}
                            />
                        </Col>
                    </ContainerDiv>
                </Label>

                <LabelBarre name="Ou" top>
                    <ButtonNav
                        to='privateRoomConfig'
                        action={props.redirectTo}
                        name='Créer une partie'
                        big
                    />
                </LabelBarre>
            </Spacer>
        </>
    );
}

