import {ReactElement} from 'react';
import styled from 'styled-components';
import {BigNumber} from 'ethers';
import {Col} from '../components/Col';
import {Typography} from '../components/Typography';
import {ColorWrap, Countdown} from '../components';
import {Row} from '../components/Row';
import {useLira} from '../hooks';
import {formatUint256} from '../utils';
import {Colors} from '../theme';
import daVinciLira from '../img/da-vinci-lira.svg';
import stepOneCardImage from '../img/lira-pre-sale-step-1.png';
import stepTwoCardImage from '../img/lira-pre-sale-step-2.png';
import stepThreeCardImage from '../img/lira-pre-sale-step-3.png';
import button from '../img/button.svg';
import {background, BackgroundProps, fontSize, FontSizeProps} from 'styled-system';

const StyledContainer = styled(Col)<BackgroundProps>`
  background: url(${daVinciLira}) no-repeat;
  background-position-y: -250px;

  ${background};
`

const StyledText = styled.p<FontSizeProps>`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fontFamilies.secondary};
  ${fontSize};
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
  width: number | number[]
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

export const PreSaleInfoCard = styled(Row)<any>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  background: url(${props => props.background});
  opacity: ${props => props.opacity || 1};
  left: -17.29%;
  right: -71.04%;
  top: -11.25%;
  bottom: -35.94%;
  border-left: 10px;
  border-top-left-radius: 30;
`

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

  return (
    <StyledContainer backgroundPosition={['10% -250px', '20% -250px', '50% -250px', '100% -250px']}>
      <Col maxWidth={2048} margin={['0 20px', '0 20px', '0 20px', '0 20px']} alignItems="flex-start">
        <Row>
          <StyledText as="h2" fontSize={['32px', '46px', '80px', '96px']}>
            CRYPTOCURRENCY <br/>GLOBAL <ColorWrap color="primary">REVOLUTION</ColorWrap>
          </StyledText>
        </Row>

        <Row width={[1, 3 / 4, 1 / 2]} flexDirection={['column', 'row', 'row', 'row']}>
          <InfoBox
            width={[1, 1 / 2]}
            heading={lockedSupplyText}
            subtitle="wBTC LOCKED"
          />
          <InfoBox
            width={[1, 1 / 2]}
            heading={totalSupplyText}
            subtitle="TOTAL SUPPLY"
          />
        </Row>

        <Row marginTop={56}>
          <InfoBox width={1} heading={liraValue} subtitle="LIRA INTRINSIC VALUE"/>
        </Row>

        <Row marginTop={120} display={['none','none','none','flex']}>
          <img src={button} alt="Buy LIRA" style={{opacity: 0.3}}/>
        </Row>
      </Col>

      <Col maxWidth={2048} margin={['0 20px 180px']} alignItems={['center', 'center', 'center', 'flex-start']}>
        <Row>
          <StyledText as="h3" fontSize={['32px', '46px', '46px', '80px']}>
            <ColorWrap color="primary">"</ColorWrap><br/>Join the <ColorWrap color="primary">revolution</ColorWrap>
          </StyledText>
        </Row>
        <Col width={[1, 1, 1, 4 / 5]}>
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
        <Countdown date={new Date('06/18/2023')} />
      </Col>

      <Col maxWidth={2048} margin={['0 20px']} marginY={150}>
        <Row alignItems={['center']} justifyContent="space-evenly">
          <PreSaleInfoCard alignItems={'start'} flexDirection={'column'} width={'480px'} height={'378px'} background={stepOneCardImage}>
            <Col marginLeft={'100px'}>
              <Typography fontFamily={'primary'} fontWeight={700} color="primary" fontSize='subtitle' marginY={50}>
                Lira Presale
              </Typography>
              <Typography fontWeight={700} color="white" fontSize='p' marginY={20}>
                The Satoshi Lira presale and its tokens, LIRA/TBg/TBs/TBb and YOSHI.
              </Typography>
              <Typography color="secondary" fontSize='p' marginY={40}>
                view more &#62;
              </Typography>
            </Col>
          </PreSaleInfoCard>
          <PreSaleInfoCard alignItems={'start'} flexDirection={'column'} width={'480px'} height={'378px'} background={stepTwoCardImage}>
            <Col marginLeft={'100px'}>
              <Typography fontFamily={'primary'} fontWeight={700} color="primary" fontSize='subtitle' marginY={50}>
                Sacrifice Phase
              </Typography>
              <Typography fontWeight={700} color="white" fontSize='p' marginY={20}>
                The Satoshi Lira presale and its tokens, LIRA/TBg/TBs/TBb and YOSHI.
              </Typography>
              <Typography color="secondary" fontSize='p' marginY={40}>
                view more &#62;
              </Typography>
            </Col>
          </PreSaleInfoCard>
          <PreSaleInfoCard alignItems={'start'} width={'480px'} height={'378px'} background={stepThreeCardImage}>
            <Col marginLeft={'100px'}>
              <Typography fontFamily={'primary'} fontWeight={700} color="primary" fontSize='subtitle' marginY={50}>
                Reward phase of Sacrifice
              </Typography>
              <Typography fontWeight={700} color="white" fontSize='p' marginY={20}>
                LIRA/TBg/TBs/TBb and YOSHI.
              </Typography>
              <Typography color="secondary" fontSize='p' marginY={40}>
                view more &#62;
              </Typography>
            </Col>
          </PreSaleInfoCard>
        </Row>
      </Col>

    </StyledContainer>
  )
}
