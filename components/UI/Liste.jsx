import styled from 'styled-components';

const ListeStyled = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
    color: ${props => props.theme.white};
    font-size: 1.6rem; 
`

const Li = styled.li`
    padding: 10px 0;
`

export default function Liste(props) {
    let listItems = [];

    if (props.nbrJoueursMax) {
        const nbrJoueurs = props.nbrJoueursMax / 2;
        if (props.array) {
            let listPlayer = props.array;
            if (listPlayer.length < nbrJoueurs) {
                for (let i = -1; i < nbrJoueurs - listPlayer.length; i++) {
                    listPlayer.push('. . .');
                }
            }
            listItems = listPlayer.map((element, index) => <Li key={index}>{element}</Li>);
        } else {
            for (let i = 0; i < nbrJoueurs; i++) {
                listItems.push(<Li key={i}> . . . </Li>);
            }
        }
    } else {
        if (props.array) {
            listItems = props.array.map((element, index) => <Li key={index}>{element}</Li>);
        } else {
            listItems.push(<Li key={i}> . . . </Li>);
        }
    }

    return (
        <ListeStyled>{listItems}</ListeStyled>
    );
}