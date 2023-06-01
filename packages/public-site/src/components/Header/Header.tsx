import logo from '../../img/satoshi-logo.svg'
import {Row} from "../Row";
import {Typography} from "../Typography";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

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
    <Row height={176} justifyContent="space-between" alignItems="center" maxWidth={2048} margin="0 auto" padding="0 28px">
      <Row width={1/3}>
        <NavLink to="/">
          <img src={logo} height={64} alt="satoshi lira logo"/>
        </NavLink>
      </Row>

      <Row width={1/3} justifyContent="center">
        <a href='https://whitepaper.satoshilira.io' target="_blank" rel="noreferrer">
          <StyledMenuItem marginRight={28}>
            WHITEPAPER
          </StyledMenuItem>
        </a>

        <NavLink to="/tokens">
          <StyledMenuItem marginX={28}>
            TOKENS
          </StyledMenuItem>
        </NavLink>

        <NavLink to="/blockchain-data">
          <StyledMenuItem marginLeft={28}>
            BLOCKCHAIN DATA
          </StyledMenuItem>
        </NavLink>
      </Row>

      <Row width={1/3} justifyContent="flex-end">
        <StyledButton>
          ENTER APP
        </StyledButton>
      </Row>
    </Row>
  )
}
