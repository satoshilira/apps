import styled from 'styled-components';
import {Col} from '../components/Col';
import {Typography} from '../components/Typography';
import {ColorWrap} from '../components';
import daVinciLira from '../img/da-vinci-lira.svg';
import button from '../img/button.svg';
import {Row} from '../components/Row';
import {ReactElement} from 'react';
import {useLira} from '../hooks';
import {formatUint256} from '../utils';
import {BigNumber} from 'ethers';
import Countdown from 'react-countdown';
import {CountdownRenderProps} from 'react-countdown/dist/Countdown';
import {Colors} from "../theme";

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

export interface StyledRectangleProps {
  width: number
  height: number
  color: keyof Colors
  opacity?: number
}

export const StyledRectangle = styled(Row)<StyledRectangleProps>`
  display: block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: ${props => props.theme.colors[props.color]};
  opacity: ${props => props.opacity || 1};
`

export interface InfoBoxProps {
  width: number
  heading: string | ReactElement | null
  subtitle: string
}

export function InfoBox({width, heading, subtitle}: InfoBoxProps) {
  return (
    <Col width={width}>
      <StyledRectangle width={32} height={4} color="primary" />
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

  const lockedSupplyText = !isLoadingLockedSupply && lockedSupply
    ? <Typography as="h6" color="white"
                  margin="32px 0 0">{`${formatUint256(lockedSupply as BigNumber, 0, false, 0)} SAT`}</Typography>
    : null

  const totalSupplyText = !isLoadingTotalSupply
    ? <Typography as="h6" color="white"
                  margin="32px 0 0">{`${formatUint256(totalSupply as BigNumber, 0, false, 0)} LIRA`}</Typography>
    : null

  const liraValue = <TextWithVariation text={`1 LIRA = ${intrinsicValue.toFixed(2)} SAT`}
                                       value={Number((intrinsicValue - 1) * 100).toFixed(2)}/>

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      // Render a completed state
      return 'ended';
    }

    return (
      <Row justifyContent="center">
        <Col marginX={32}>
          <Typography color="white" fontFamily="secondary" fontSize="h4" fontWeight="bold" lineHeight="60px" margin={0}>{days}</Typography>
          <Typography color="white" fontSize="subtitle" margin="0 0 10px" lineHeight="30px">Days</Typography>
          <StyledRectangle width={92} height={4} color="horizontalGreenToCyan" opacity={0.6} />
        </Col>
        <Col marginX={32}>
          <Typography color="white" fontFamily="secondary" fontSize="h4" fontWeight="bold" lineHeight="60px" margin={0}>{hours}</Typography>
          <Typography color="white" fontSize="subtitle" margin="0 0 10px" lineHeight="30px">Hours</Typography>
          <StyledRectangle width={92} height={4} color="horizontalGreenToCyan" opacity={0.6} />
        </Col>
        <Col marginX={32}>
          <Typography color="white" fontFamily="secondary" fontSize="h4" fontWeight="bold" lineHeight="60px" margin={0}>{minutes}</Typography>
          <Typography color="white" fontSize="subtitle" margin="0 0 10px" lineHeight="30px">Minutes</Typography>
          <StyledRectangle width={92} height={4} color="horizontalGreenToCyan" opacity={0.6} />
        </Col>
        <Col marginX={32}>
          <Typography color="primary" fontFamily="secondary" fontSize="h4" fontWeight="bold" lineHeight="60px" margin={0}>{seconds}</Typography>
          <Typography color="white" fontSize="subtitle" margin="0 0 10px" lineHeight="30px">Sec</Typography>
          <StyledRectangle width={92} height={4} color="horizontalGreenToCyan" opacity={0.6} />
        </Col>
      </Row>
    )
  };

  return (
    <StyledContainer>
      <Col>
        <Row>
          <Typography as="h2" color="white" fontFamily="secondary">
            CRYPTOCURRENCY <br/>GLOBAL <ColorWrap color="primary">REVOLUTION</ColorWrap>
          </Typography>
        </Row>

        <Row>
          <InfoBox
            width={1 / 4}
            heading={lockedSupplyText}
            subtitle="wBTC LOCKED"
          />
          <InfoBox
            width={1 / 4}
            heading={totalSupplyText}
            subtitle="TOTAL SUPPLY"
          />
        </Row>

        <Row marginTop={56}>
          <InfoBox width={1 / 2} heading={liraValue} subtitle="LIRA INTRINSIC VALUE"/>
        </Row>

        <Row marginTop={120}>
          <img src={button} alt="Buy LIRA" style={{opacity: 0.3}}/>
        </Row>
      </Col>

      <Col marginTop={160} marginBottom={80}>
        <Row>
          <Typography as="h3" color="white" marginY={32}>
            <ColorWrap color="primary">"</ColorWrap><br/>Join the <ColorWrap color="primary">revolution</ColorWrap>
          </Typography>
        </Row>
        <Col width={4 / 5}>
          <Typography color="white" fontSize="body" marginY={32}>
            Satoshi LIRA presents a revolutionary project within the cryptocurrency sector, offering economic and
            political independence through decentralized finance. By leveraging liquidity provision as our core
            business, we generate value that is converted into BTC, creating the LIRA derivative.
          </Typography>
          <Typography color="white" fontSize="body" marginY={0}>
            Take the first step toward a new era of financial freedom with Satoshi LIRA. Join our community and explore
            the endless possibilities of decentralized finance today.
          </Typography>
        </Col>
      </Col>

      <Col marginY={80}>
        <Countdown
          date={new Date('06/18/2023')}
          renderer={countdownRenderer}
        />
      </Col>
    </StyledContainer>
  )
}
