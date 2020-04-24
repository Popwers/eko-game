import { LinkStyle } from '../design/designComponents'

export default function ButtonNav(props) {
    function handleClick(e) {
        e.preventDefault();
        props.action(props.to);
    }

    return (
        <LinkStyle
            href='#'
            big={props.big}
            onClick={handleClick}
            disabled={props.disabled} >{props.name}</LinkStyle>
    )
}

