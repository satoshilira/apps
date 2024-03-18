import { Col } from '../../components/Col';
import { usePresale } from '../../hooks/usePresale';
import { Countdown } from '../../components';
import { Typography } from '../../components/Typography';
import { ChangeEvent, useState } from 'react';
import { Row } from '../../components/Row';
import styled from 'styled-components';


const StyledInput = styled.input`
  width: 100%;
  height: 30px;
`;

export function Presale() {
  const presale = usePresale();

  const [amount, setAmount] = useState<string>('10000');
  const [error, setError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value);
    let error = '';

    if (!Number.isInteger(+value) || +value < 0) {
      error = 'Please provide a positive integer';
    }

    if (Number(value) < 10000) {
      error = 'Minimum SAT amount is 10000';
    }

    setError(error);
  };

  console.log('pre', presale.started);
  console.log('round', presale.round);

  return (
    <Col style={{ minHeight: '100vh' }} alignItems="center">
      <Countdown date={presale.roundEndDate} />
      <Typography>start: {presale.round?.start.toString()}</Typography>
      <Typography>end: {presale.round?.end.toString()}</Typography>
      <Typography>bonus: {presale.round?.bonus.toString()}</Typography>
      <Typography>round start date: {presale.roundStartDate.toString()}</Typography>
      <Typography>round end date: {presale.roundEndDate.toString()}</Typography>

      <Row width={1 / 2} my={20} alignItems="center" justifyContent="center">
        <StyledInput id="amount" name="amount" type="number" value={amount} onChange={handleChange} />
        <Typography as="h6" color="white" margin={0}>ETH</Typography>
      </Row>
    </Col>
  );
}
