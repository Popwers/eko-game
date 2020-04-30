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
    const itemVide = <Li> . . . </Li>;
    const listItems = [];

    if (props.nbrJoueursMax) {
        if (props.array) {
            listItems = props.array.map((element, index) => <Li key={index}>{element}</Li>);
        } else {
            for (let i = 0; i < props.nbrJoueursMax; i++) {
                listItems.push(itemVide);
            }
        }
    } else {
        if (props.array) {
            listItems = props.array.map((element) => <Li>{element}</Li>);
        } else {
            listItems.push(itemVide);
        }
    }

    return (
        <ListeStyled>{listItems}</ListeStyled>
    );
}