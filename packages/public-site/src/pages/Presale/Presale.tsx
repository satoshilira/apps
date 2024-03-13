import { Col } from '../../components/Col';
import { usePresale } from '../../hooks/usePresale';
import { Countdown } from '../../components';
import { Typography } from '../../components/Typography';


export function Presale() {
  const presale = usePresale();

  console.log('pre', presale.started.data);
  console.log('round', presale.round);

  return (
    <Col style={{ minHeight: '100vh' }} alignItems="center">
      <Countdown date={new Date()} />
      <Typography>start: {presale.round?.start.toString()}</Typography>
      <Typography>start: {presale.round?.end.toString()}</Typography>
      <Typography>start: {presale.round?.bonus.toString()}</Typography>
    </Col>
  );
}
