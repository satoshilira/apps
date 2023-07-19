import styled from 'styled-components';
import {Typography} from '../components/Typography';
import {Col} from '../components/Col';
import {Row} from '../components/Row';
import {addLiraToken} from '../utils/addLiraToken';
import logoArbitrum from '../img/arbitrum-shield.png'
import logoMetamask from '../img/metamask-fox.svg'

const StyledLogo = styled.img`
  margin: 0 8px;
`

const StyledCopyButton = styled(Typography)`
  color: ${props => props.theme.colors['white-80']};
  cursor: pointer;

  &:active {
    color: ${props => props.theme.colors.primary};
  }

  &::selection {
    color: inherit;
    background: inherit;
  }
`

export default function Tokens() {
  const copy = () => navigator.clipboard.writeText('0xA07ac236fEBc390c798504E927DC8D6a4e1FfcA3')

  return (
    <Col alignItems="center">
      <Row flexDirection={['column', 'column', 'column', 'row']} alignItems="center">
        <Typography as="h5" color="white" margin="0 8px">Satoshi LIRA</Typography>
        <a href="https://arbiscan.io/address/0xA07ac236fEBc390c798504E927DC8D6a4e1FfcA3" target="_blank"
           rel="noreferrer">
          <StyledLogo
            src={logoArbitrum}
            alt="link to satoshili lira contract on arbiscan"
            width={50}
            height={50}
          />
        </a>
        <StyledLogo
          src={logoMetamask}
          alt="add to metamask"
          width={40}
          onClick={addLiraToken}
        />
      </Row>
      <Row flexDirection={['column', 'column', 'column', 'row']} alignItems="center">
        <Typography fontSize="body" color="white" wordBreak="break-all" marginX={[20, 0]} textAlign="center">0xA07ac236fEBc390c798504E927DC8D6a4e1FfcA3</Typography>
        {/* TODO: better copy button */}
        <StyledCopyButton onClick={copy} marginLeft={3}>
          Copy
        </StyledCopyButton>
      </Row>
    </Col>
  )
}
