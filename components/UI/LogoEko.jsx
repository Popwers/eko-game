import styled from 'styled-components';
import logo from '../../public/images/logo.svg';

const LogoImg = styled.img`
    width: 200px;
    margin: 0 auto;
`
export default () => <LogoImg src={logo} />