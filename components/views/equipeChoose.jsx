import Logo from "../UI/LogoEko";
import ButtonNav from "../UI/ButtonNav";
import ButtonChoixEquipe from "../UI/ButtonChoixEquipe";
import Label from "../UI/Label";
import { Spacer, Col } from '../design/designComponents';
import choixEcolo from '../../public/images/choix_ecolo.svg';
import choixPollueur from '../../public/images/choix_pollueur.svg';

export default (props) => {
    return (
        <>
            <Spacer>
                <Logo />
            </Spacer>

            <Spacer>
                <Col dividCol={3}>
                    <ButtonChoixEquipe 
                        equipe='ecologiste'
                        initChoose={props.initialChooseE}
                        onClick={props.choseEquipe} 
                        src={choixEcolo}
                    />
                </Col>

                <Col dividCol={3}>
                    <Label name="Choisis ton camp" top>
                        <ButtonNav
                            to='fileAttente'
                            action={props.redirectTo}
                            name='Suivant'
                            disabled={props.buttonStat}
                            big
                        />
                    </Label>
                </Col>

                <Col dividCol={3}>
                    <ButtonChoixEquipe 
                        equipe='pollueur'
                        initChoose={props.initialChooseE}
                        onClick={props.choseEquipe}
                        src={choixPollueur}
                    />
                </Col>
            </Spacer>
        </>
    );
}

