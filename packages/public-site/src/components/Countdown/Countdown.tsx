import {default as ReactCountdown} from 'react-countdown';
import {CountdownRenderProps} from "react-countdown/dist/Countdown";
import {Row} from "../Row";
import {Col} from "../Col";
import {Typography} from "../Typography";
import {StyledRectangle} from "../../pages/Home";
import styled from "styled-components";
export interface CountdownProps {
  date: Date
}

const StyledValue = styled(Typography)`
  font-family: ${props => props.theme.fontFamilies.secondary};
  font-size: ${props => props.theme.fontSizes.h4};
  font-weight: bold;
  margin: 0;
  text-align: left;
  line-height: 60px;
`

const StyledLabel = styled(Typography)`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.subtitle};
  margin: 0 0 10px;
  text-align: left;
  line-height: 30px;
`

export function Countdown({date}: CountdownProps) {
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      return 'ended';
    }

    return (
      <Row flexDirection={['column', 'column', 'row', 'row']} justifyContent="center" alignItems="center">
        <Col marginX={32} width={110} pb={[10, 10, 10, 0]}>
          <StyledValue>{days}</StyledValue>
          <StyledLabel>Days</StyledLabel>
          <StyledRectangle width={92} height={4} color="horizontalGreenToCyan" opacity={0.6} />
        </Col>
        <Col marginX={32} width={110} pb={[10, 10, 10, 0]}>
          <StyledValue>{hours}</StyledValue>
          <StyledLabel>Hours</StyledLabel>
          <StyledRectangle width={92} height={4} color="horizontalGreenToCyan" opacity={0.6} />
        </Col>
        <Col marginX={32} width={110} pb={[10, 10, 10, 0]}>
          <StyledValue>{minutes}</StyledValue>
          <StyledLabel>Minutes</StyledLabel>
          <StyledRectangle width={92} height={4} color="horizontalGreenToCyan" opacity={0.6} />
        </Col>
        <Col marginX={32} width={110}>
          <StyledValue color="primary">{seconds}</StyledValue>
          <StyledLabel>Sec</StyledLabel>
          <StyledRectangle width={92} height={4} color="horizontalGreenToCyan" opacity={0.6} />
        </Col>
      </Row>
    )
  };

  return (
    <ReactCountdown
      date={date}
      renderer={countdownRenderer}
    />
  )
}
