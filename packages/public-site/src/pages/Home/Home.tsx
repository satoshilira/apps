import {ReactElement, useState} from 'react';
import styled from 'styled-components';
import {BigNumber} from 'ethers';
import {Col} from '../../components/Col';
import {Typography} from '../../components/Typography';
import {ColorWrap, Countdown} from '../../components';
import {Row} from '../../components/Row';
import {useLira} from '../../hooks';
import {formatUint256} from '../../utils';
import {Colors} from '../../theme';
import daVinciLira from '../../img/da-vinci-lira.svg';
import stepOneCardImage from '../../img/lira-pre-sale-step-1.png';
import stepTwoCardImage from '../../img/lira-pre-sale-step-2.png';
import stepThreeCardImage from '../../img/lira-pre-sale-step-3.png';
import stepOneModalImage from '../../img/modal-pre-sale-step-1.png';
import stepTwoModalImage from '../../img/modal-pre-sale-step-2.png';
import stepThreeModalImage from '../../img/modal-pre-sale-step-3.png';
import button from '../../img/button.svg';
import {background, BackgroundProps, fontSize, FontSizeProps} from 'styled-system';
import { Modal } from 'react-overlays';


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

// TODO: move to src/components/cards/PreSaleInfoCard.ts
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
  border-top-left-radius: 30px;
`

// TODO: move to src/components/modals/Backdrop.ts
const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 1;
`;

// TODO: move to src/components/modals/PositionedModal.ts
const PositionedModal = styled(Modal)`
  position: fixed;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  z-index: 1040;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
`;

export function Home() {
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

  const [showModalOne, setShowModalOne] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const [showModalThree, setShowModalThree] = useState(false);

  const renderBackdrop = (props: any) => <Backdrop className="backdrop" {...props} />;

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

      {/* TODO: move to src/pages/Home/sections/PresaleSection.ts */}
      {/* <Col maxWidth={2048} margin={['0px 20px 270px 20px']}>
        <Row justifyContent={['center']} marginBottom={'3%'}>
          <StyledText as="h3" fontSize={['32px', '48px']}>
            Pre-sale <ColorWrap color="primary">Info</ColorWrap>
          </StyledText>
        </Row>
        <Row alignItems={['center']} flexDirection={['column', 'column', 'column', 'row']} justifyContent="space-evenly">
          <PreSaleInfoCard alignItems={'start'} width={'480px'} height={'378px'} background={stepOneCardImage} marginBottom={['25px', '25px', '25px', '0px']}>
            <Col marginLeft={'100px'} marginRight={'25px'}>
              <Typography fontFamily={'primary'} fontWeight={700} color="primary" fontSize='subtitle' marginY={35}>
                Lira Fair Launch
              </Typography>
              <Typography fontWeight={700} color="white" fontSize='p' marginY={10}>
                The fair launch will allow to be part of the Satoshi LIRA ecosystem by owning LIRA and its derivatives.
              </Typography>
              <Typography color="secondary" fontSize='p' marginY={25} onClick={() => setShowModalOne(true)}>
                view more &#62;
              </Typography>
            </Col>
          </PreSaleInfoCard>
          <PositionedModal
            top={6}
            left={17}
            show={showModalOne}
            onHide={() => setShowModalOne(false)}
            renderBackdrop={renderBackdrop}
            aria-labelledby="modal-label"
            autoFocus={false}
          >
            <div style = {{
              height: "834px",
              width: "1258px",
              backgroundImage:`url(${stepOneModalImage})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}>
              <div style={{
                paddingTop: "2rem",
                paddingLeft: "15rem",
                paddingRight: "8rem"
              }}>
                <Typography fontFamily={'primary'} fontWeight={700} color="primary" fontSize='h5' marginY={5}>
                  Lira Fair Launch
                </Typography>
                <hr style={{ marginBottom: "3rem" }}></hr>
                <Typography color="white" fontSize='p' marginY={10}>
                  The Satoshi LIRA presale and its tokens, LIRA/TBg/TBs/TBb, and YOSHI, are structured into two distinct phases: the Sacrifice Phase and the Reward Phase of Sacrifice.
                  <br/><br/>
                  This presale is designed to establish a sound and ethical token economics from day zero, aligning with the core mission of the LIRA team to create the first cryptocurrency with genuine and unequivocal intrinsic value.
                  <br/><br/>
                  Therefore, structuring the presale traditionally would undermine the fundamental concept of Satoshi LIRA as a BTC derivative.
                </Typography>
              </div>
            </div>
          </PositionedModal>

          <PreSaleInfoCard alignItems={'start'} width={'480px'} height={'378px'} background={stepTwoCardImage} marginBottom={['25px', '25px', '25px', '0px']} paddingRight={['15px']}>
            <Col marginLeft={'100px'} marginRight={'25px'}>
              <Typography fontFamily={'primary'} fontWeight={700} color="primary" fontSize='subtitle' marginY={35}>
                Sacrifice Phase
              </Typography>
              <Typography fontWeight={700} color="white" fontSize='p' marginY={10}>
                In the Sacrifice phase users are required to send wBTC to the Satoshi LIRA contract through the website.
              </Typography>
              <Typography color="secondary" fontSize='p' marginY={25} onClick={() => setShowModalTwo(true)}>
                view more &#62;
              </Typography>
            </Col>
          </PreSaleInfoCard>
          <PositionedModal
            top={6}
            left={17}
            show={showModalTwo}
            onHide={() => setShowModalTwo(false)}
            renderBackdrop={renderBackdrop}
            aria-labelledby="modal-label"
            autoFocus={false}
          >
            <div
              style = {{
                height: "834px",
                width: "1258px",
                backgroundImage:`url(${stepTwoModalImage})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}>
                <div style={{
                  paddingTop: "2rem",
                  paddingLeft: "15rem",
                  paddingRight: "8rem"
                 }}>
                  <Typography fontFamily={'primary'} fontWeight={700} color="primary" fontSize='h5' marginY={5}>
                    Sacrifice Phase
                  </Typography>
                  <hr style={{ marginBottom: "3rem" }}></hr>
                  <Typography color="white" fontSize='p' marginY={10}>
                    The sacrifice phase consists of three sub-phases, each lasting one week, with a maximum amount of 1 wBTC that can be sacrificed per sub-phase.
                    <br/><br/>
                    The pricing structure for each sub-phase starts from 1 LIRA = 1 Satoshi for the first weak, 1 LIRA = 1.6 Satoshi for the second week and 1 LIRA = 2 Satoshi for the third week.
                  </Typography>
                </div>
            </div>
          </PositionedModal>

          <PreSaleInfoCard alignItems={'start'} width={'480px'} height={'378px'} background={stepThreeCardImage} marginBottom={['25px', '25px', '25px', '0px']}>
            <Col marginLeft={'100px'} marginRight={'15px'}>
              <Typography fontFamily={'primary'} fontWeight={700} color="primary" fontSize='subtitle' marginY={35}>
                Reward phase of Sacrifice
              </Typography>
              <Typography fontWeight={700} color="white" fontSize='p' marginY={10}>
                In the reward phase users will receive the due amount of LIRA according to the amount sent in the sacrifice phase.
              </Typography>
              <Typography color="secondary" fontSize='p' marginY={25} onClick={() => setShowModalThree(true)}>
                view more &#62;
              </Typography>
            </Col>
          </PreSaleInfoCard>
          <PositionedModal
            top={6}
            left={17}
            show={showModalThree}
            onHide={() => setShowModalThree(false)}
            renderBackdrop={renderBackdrop}
            aria-labelledby="modal-label"
            autoFocus={false}
          >
            <div
              style = {{
                height: "834px",
                width: "1258px",
                backgroundImage:`url(${stepThreeModalImage})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}>
                <div style={{
                  paddingTop: "2rem",
                  paddingLeft: "15rem",
                  paddingRight: "8rem"
                }}>
                  <Typography fontFamily={'primary'} fontWeight={700} color="primary" fontSize='h5' marginY={5}>
                    Reward phase of Sacrifice
                  </Typography>
                  <hr style={{ marginBottom: "3rem" }}></hr>
                  <Typography color='white' fontSize='p' marginY={10}>
                    This phase is where the sacrifices made during the presale are rewarded based on the time and quantity of wBTC sacrificed.
                    <br/><br/>
                    Once the Sacrifice Phase concludes, the capital collected will be utilized by the protocol for liquidity provision activities, activating the entire Satoshi LIRA ecosystem.
                    <br/><br/>
                    The rewards generated from the liquidity provision activities, as explained in the corresponding chapter, will be converted into wBTC and used to mint new LIRA.
                    Throughout the Reward Phase of Sacrifice, 50% of each minted block will be utilized to reward users who made sacrifices in the order they were made.
                    <br/>
                    Once all the sacrifices have been rewarded, the LIRA ecosystem reaches 100% efficiency, and all newly minted LIRA blocks are distributed throughout the ecosystem.
                    <br/><br/>
                    Please note that this summary has been provided for clarity and comprehensibility purposes. For more detailed information, please refer to the relevant chapters of our documentation.
                  </Typography>
                </div>
            </div>
          </PositionedModal>
        </Row>
      </Col> */}

    </StyledContainer>
  )
}
