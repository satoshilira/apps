import {default as ReactCountdown} from 'react-countdown';
import {CountdownRenderProps} from "react-countdown/dist/Countdown";
import {Row} from "../Row";
import {Col} from "../Col";
import {Typography} from "../Typography";
import {StyledRectangle} from "../../pages/Home";
export interface CountdownProps {
  date: Date
}

export function Countdown({date}: CountdownProps) {
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
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
    <ReactCountdown
      date={date}
      renderer={countdownRenderer}
    />
  )
}
