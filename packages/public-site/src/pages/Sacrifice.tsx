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
import {Button} from "../components/Button";

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
    ended,
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

    if (!Number.isInteger(+value) || +value < 0) {
      error = 'Please provide a positive integer';
    }

    if (Number(value) < 10000) {
      error = 'Minimum SAT amount is 10000';
    }

    setError(error)
  };

  const canSacrifice = (!Number.isInteger(+amount) || +amount < 0) && allowance.gte(BigNumber.from(amount))

  const sacrificeButtonDisabled = !!error || !isLoadingSacrifceTransacion

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
    <Col style={{ minHeight: '100vh' }} alignItems="center">
      <ConnectButton />

      {isConnected && (
        <Col marginY={80} style={{ textAlign: 'center', alignItems: 'center' }}>
          {started as boolean && (
            <>
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
                <Button>Sacrifice</Button>
                <button onClick={onSacrifice} disabled={sacrificeButtonDisabled}>{canSacrifice ? 'Sacrifice' : 'Approve'}</button>
              </Row>
            </>
          )}
        </Col>
      )}

      <Col width={1/2} mt={30}>
        <Typography as="h5" color="white" margin={0} mb={16}>Sacrifices</Typography>
        {Array.isArray(sacrifices) && sacrifices.length > 0 && (
          sacrifices.map(({ owner, amount, redeemed }: { owner: string, amount: BigNumber, redeemed: boolean }) => (
            <Row justifyContent="space-between" style={{ border: '1px solid white'}} py={10} px={16}>
              <Typography color="white">{owner}</Typography>
              <Typography color="white">{formatUint256(amount, 8, false, 0)} LIRA</Typography>
              {/*<Typography color="white">{redeemed ? 'redeemed' : 'not redeemed'}</Typography>*/}
            </Row>
          ))
        )}
      </Col>
    </Col>
  )
}
