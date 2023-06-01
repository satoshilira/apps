import styled from "styled-components";
import {Col} from '../components/Col';
import {Typography} from '../components/Typography';
import {ColorWrap} from '../components';
import daVinciLira from '../img/da-vinci-lira.svg';
import button from '../img/button.svg';
import {Row} from "../components/Row";
import {ReactElement} from "react";
import {useLira} from "../hooks";

const StyledContainer = styled(Col)`
  max-width: 2048px;
  margin: 0 auto;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 1546px;
    height: 1304px;
    background-image: url(${daVinciLira});
    background-repeat: no-repeat;
    background-position: right center;
    z-index: -1;
  }
`

const StyledRectangle = styled(Row)`
  display: block;
  width: 32px;
  height: 4px;
  background-color: ${props => props.theme.colors.primary};
`

export interface InfoBoxProps {
  width: number
  heading: string | ReactElement | null
  subtitle: string
}

export function InfoBox({ width, heading, subtitle }: InfoBoxProps) {
  return (
    <Col width={width}>
      <StyledRectangle />
      <Row>
        {heading}
      </Row>
      <Row>
        <Typography color="white-80">{subtitle}</Typography>
      </Row>
    </Col>
  )
}

export interface TextWithVariationProps {
  text: string
  value: string
  positive?: boolean
}

export function TextWithVariation({text, value, positive = true}: TextWithVariationProps) {
  return (
    <Typography
      as="h6"
      color="white"
      margin="32px 0 0"
    >
      {text} (<ColorWrap color={positive ? 'primary' : 'secondary'}>{positive ? '+' : '-'}{value}%</ColorWrap>)
    </Typography>
  )
}

export default function Home() {
  const {totalSupply, lockedSupply, isLoadingTotalSupply, isLoadingLockedSupply, intrinsicValue} = useLira()
  console.log('lockedSupply', lockedSupply)
  const lockedSupplyText = !isLoadingLockedSupply
    ? <Typography as="h6" color="white" margin="32px 0 0">{`${lockedSupply} SAT`}</Typography>
    : null

  const totalSupplyText = !isLoadingTotalSupply
    ? <Typography as="h6" color="white" margin="32px 0 0">{`${totalSupply} LIRA`}</Typography>
    : null

  const liraValue = <TextWithVariation text={`1 LIRA = ${intrinsicValue.toFixed(2)} SAT`} value={Number((intrinsicValue - 1) * 100).toFixed(2)} />

  return (
    <StyledContainer>
      <Col>
        <Row>
          <Typography as="h2" color="white" fontFamily="secondary">
            CRYPTOCURRENCY <br />GLOBAL <ColorWrap color="primary">REVOLUTION</ColorWrap>
          </Typography>
        </Row>

        <Row>
          <InfoBox
            width={1/4}
            heading={lockedSupplyText}
            subtitle="wBTC LOCKED"
          />
          <InfoBox
            width={1/4}
            heading={totalSupplyText}
            subtitle="TOTAL SUPPLY"
          />
        </Row>

        <Row marginTop={56}>
          <InfoBox width={1/2} heading={liraValue} subtitle="LIRA INTRINSIC VALUE" />
        </Row>

        <Row marginTop={120}>
          <img src={button} alt="Buy LIRA" />
        </Row>
      </Col>
    </StyledContainer>
  )
}
