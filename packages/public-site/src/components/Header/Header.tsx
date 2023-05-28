import logo from '../../img/satoshi-logo.svg'
import {Row} from "../Row";
import {Typography} from "../Typography";
import styled from "styled-components";

const StyledMenuItem = styled(Typography)`
  color: ${props => props.theme.colors['white-80']};
  cursor: pointer;
  font-weight: 400;
  line-height: 27px;

  ::selection {
    color: inherit;
    background: transparent;
    text-shadow: none;
  }

  /* For Mozilla Firefox */

  ::-moz-selection {
    color: inherit;
    background: transparent;
    text-shadow: none;
  }

  &:hover {
    color: ${props => props.theme.colors.white};
  }

  &:active {
    color: ${props => props.theme.colors.primary};
  }
`

const StyledButton = styled(Row)`
  padding: 13px 28px;
  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  background: ${props => props.theme.colors.gradients.horizontalGreenToCyan};
`

export function Header() {
  return (
    <Row height={176} justifyContent="space-between" alignItems="center" marginX="20%">
      <Row>
        <img src={logo} height={64} alt="satoshi lira logo"/>
      </Row>
      <Row>
        <StyledMenuItem marginRight={28}>
          WHITEPAPER
        </StyledMenuItem>
        <StyledMenuItem marginX={28}>
          TOKENS
        </StyledMenuItem>
        <StyledMenuItem marginLeft={28}>
          BLOCKCHAIN DATA
        </StyledMenuItem>
      </Row>
      <StyledButton>
        ENTER SACRIFICE
      </StyledButton>
    </Row>
  )
}
