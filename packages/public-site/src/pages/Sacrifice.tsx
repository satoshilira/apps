import { ChangeEvent, useState } from 'react';
import { Typography } from '../components/Typography';
import { useSacrifice } from '../hooks';
import { Col } from '../components/Col';
import { Countdown } from '../components';
import { useWagmiNetwork } from '../hooks/useChain';
import { FontSizeProps, fontSize } from 'styled-system';
import styled from 'styled-components';
import { BigNumber } from 'ethers';
import { Row } from '../components/Row';

const StyledText = styled.p<FontSizeProps>`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fontFamilies.secondary};
  margin-bottom: 0;

  ${fontSize};
`

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
`

export default function Sacrifice() {
  const [amount, setAmount] = useState<string>('10000')
  const [error, setError] = useState('');

  const {
    bonus,
    started,
    sacrified,
    sacrificable,
    end,
    sacrificeTransaction,
    isLoadingSacrifceTransacion,
    sacrificeTransactionSuccess,
    writeSacrificeTransaction,
  } = useSacrifice()
  const { chain } = useWagmiNetwork()

  console.log('sacrifice', { sacrificeTransaction, isLoadingSacrifceTransacion, sacrificeTransactionSuccess })
  console.log('chain', chain)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmount(value);
    let error = ''

    // Controllo se il valore è un numero intero positivo
    if (!Number.isInteger(+value) || +value < 0) {
      setError('Inserisci un numero intero positivo.');
    }

    if (Number(value) < 10000) {
      setError('Minimum SAT amount is 10000');
    }

    if (error === '') {
      writeSacrificeTransaction({
        args: [amount]
      })
    } else {
      setError(error)
    }
  };

  const onSacrifice = () => {
    console.log('on sacrifice', amount)
  }

  return (
    <Col>
      <StyledText as="h2" fontSize={['32px', '46px', '80px', '96px']} color="white">Satoshi LIRA Sacrifice</StyledText>
      {started ? (
        <>
          <Col marginY={80} style={{textAlign: 'center', alignItems: 'center'}}>
            <Typography as="h5" color="white">Round ends in</Typography>
            <Countdown date={end} />
            <Row width={1 / 2} my={20} alignItems="center" justifyContent="center">
              <StyledInput id="amount" name="amount" type="number" value={amount} onChange={handleChange} />
              <Typography as="h5" color="white" margin={0}>SAT</Typography>
            </Row>
            <Row>{error && <Typography color="red">{error}</Typography>}</Row>
            <Row>
              <button onClick={onSacrifice} disabled={!!error}>Sacrifice</button>
              {error && <Typography color="white">{error}</Typography>}
            </Row>
          </Col>
        </>
      ) : (
        <>
          <Typography color="white">Sacrifice Redeem</Typography>
        </>
      )}
    </Col>
  )
}
