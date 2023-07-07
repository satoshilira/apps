import {ChangeEvent, useEffect, useState} from 'react';
import {Typography} from '../components/Typography';
import {useSacrifice, useWallet, useWbtcBalance} from '../hooks';
import {Col} from '../components/Col';
import {Countdown} from '../components';
import {fontSize, FontSizeProps} from 'styled-system';
import styled from 'styled-components';
import {Row} from '../components/Row';
import {ConnectButton} from '../components/ConnectButton/ConnectButton';
import {useNetwork} from 'wagmi';
import {formatUint256} from '../utils';
import {BigNumber} from 'ethers';
import {getSacrificeAddress} from '../utils/getAddress';

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

const StyledButton = styled.button`
  display: flex;
  max-width: 280px;
  align-items: center;
  background-color: transparent;
  padding: 8px 10px;
  border: 1px ${props => props.theme.colors.primary} solid;
  border-radius: 50px;
  cursor: pointer;

  & > img {
    margin-right: 8px;
  }

  &:active {
    border: 1px ${props => props.theme.colors.secondary} solid;
  }
`

export default function Sacrifice() {
  const [amount, setAmount] = useState<string>('10000')
  const [error, setError] = useState('');

  const { isConnected } = useWallet()

  const {
    allowance,
    end,
    isLoadingSacrifceTransacion,
    sacrificable,
    sacrificeError,
    sacrificeTransaction,
    sacrificeTransactionSuccess,
    sacrifices,
    started,
    writeApproveTransaction,
    writeSacrificeTransaction,
  } = useSacrifice()

  useEffect(() => {
    switch (sacrificeError) {
      case 'LIRA_SACRIFICE_ROUND_SOLD_OUT':
        setError('LIRA sacrifice sold out for this round')
    }
  }, [sacrificeError])

  const { chain } = useNetwork()
  const { wbtcBalance } = useWbtcBalance()

  console.log('wbtc balance', wbtcBalance)
  console.log('sacrifice', { started, sacrificeTransaction, isLoadingSacrifceTransacion, sacrificeTransactionSuccess })
  console.log('chain', chain)
  console.log('allowance', allowance, BigNumber.from(allowance || 0).toString())

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

    setError(error)
  };

  const canSacrifice = allowance.gte(BigNumber.from(amount))

  const onSacrifice = () => {
    console.log('on sacrifice', amount)

    if (!error) {
      if (canSacrifice) {
        writeSacrificeTransaction({
          args: [amount],
        })
      } else {
        writeApproveTransaction({
          args: [getSacrificeAddress(chain), amount]
        })
      }
    }
  }

  return (
    <Col style={{ minHeight: '100vh' }}>
      <ConnectButton />

      {isConnected && (
        <Col marginY={80} style={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography as="h5" color="white">Round ends in</Typography>
          <Countdown date={end} />

          <Col mt={60} />

          <Typography as="h5" color="white">{sacrificable.toString()} SAT can be sacrified</Typography>

          <Row width={1 / 2} my={20} alignItems="center" justifyContent="center">
            <StyledInput id="amount" name="amount" type="number" value={amount} onChange={handleChange} />
            <Typography as="h5" color="white" margin={0}>SAT</Typography>
          </Row>
          <Row>{(error || sacrificeError) && <Typography color="red">{error || sacrificeError}</Typography>}</Row>
          <Row>
            <button onClick={onSacrifice} disabled={!!error}>{canSacrifice ? 'Sacrifice' : 'Approve'}</button>
            {error && <Typography color="white">{error}</Typography>}
          </Row>
        </Col>
      )}

      <ul>
        {Array.isArray(sacrifices) && sacrifices.length > 0 && (
          sacrifices.map(({ owner, amount, redeemed }: { owner: string, amount: BigNumber, redeemed: boolean }) => (
            <li style={{ border: '1px solid white', padding: 10 }}>
              <Typography color="white">{owner}</Typography>
              <Typography color="white">{formatUint256(amount, 8, false, 0)} LIRA</Typography>
              <Typography color="white">{redeemed ? 'redeemed' : 'not redeemed'}</Typography>
            </li>
          ))
        )}
      </ul>
    </Col>
  )
}
