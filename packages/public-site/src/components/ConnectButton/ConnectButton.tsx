import styled from 'styled-components';
import { Col } from '../Col';
import { useWallet } from '../../hooks';
import { Typography } from '../Typography';
import metamask from '../../img/metamask-fox.svg';

const StyledButton = styled.button`
  display: flex;
  max-width: 280px;
  align-items: center;
  background-color: transparent;
  padding: 8px 10px;
  border: 1px ${props => props.theme.colors.primary} solid;
  border-radius: 50px;
  cursor: pointer;

  & > img {
    margin-right: 8px;
  }

  &:active {
    border: 1px ${props => props.theme.colors.secondary} solid;
  }
`

export function ConnectButton() {
  const { isConnected, connect, disconnect } = useWallet()

  return (
    <Col alignItems="center">
      <StyledButton onClick={() => isConnected ? disconnect() : connect()}>
        <img src={metamask} width={30} alt="metamask icon" />
        <Typography color="white" margin={0} flexGrow={1}>{isConnected ? 'Disconnect' : 'Connect'} Metamask</Typography>
      </StyledButton>
    </Col>
  )
}
