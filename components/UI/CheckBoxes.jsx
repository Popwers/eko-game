import styled from "styled-components";
import Label from "./Label";

const ContainerLabel = styled.label`
	display: inline-block;
	position: relative;
	margin: 0 20px;
	padding-left: 30px;
	cursor: pointer;
	font-size: 26px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	color: ${props => props.theme.white};

	&:hover input ~ span {
		background-color: ${props => props.theme.green};
	}
`;

const InputHide = styled.input`
	position: absolute;
	opacity: 0;
	cursor: pointer;
	height: 0;
	width: 0;

	&:checked ~ span {
		background-color: ${props => props.theme.bleuFonce};
	}

	&:checked ~ span:after {
		background: ${props => props.theme.bleuFonce};
	}
`;

const Checkmark = styled.span`
	position: absolute;
	top: 8px;
	left: 3px;
	height: 15px;
	width: 15px;
	background-color: transparent;
	border: 2px solid ${props => props.theme.white};
	border-radius: 50%;
	transition: background 0.3s, transform 0.3s;

	&:hover {
		transform: scale(1.1);
	}

	&:active {
		background-color: ${props => props.theme.bleuFonce};
		transform: scale(0.9);
	}

	&:checked {
		background-color: ${props => props.theme.bleuFonce};
	}

	&:after {
		content: "";
		position: absolute;
		top: 0px;
		left: 0px;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background: transparent;
		transition: background 0.3s;
	}
`;

function CheckBox(props) {
	return (
		<ContainerLabel>
			{props.name}
			<InputHide type="radio" name={props.select} value={props.value} />
			<Checkmark className="checkmark"></Checkmark>
		</ContainerLabel>
	);
}

export default (props) => {
	return (
		<Label name={props.label} top={props.top}>
			<CheckBox name='4' value={4} select='nbJoueur' />
			<CheckBox name='6' value={6} select='nbJoueur' />
			<CheckBox name='8' value={8} select='nbJoueur' />
		</Label>
	);
};
