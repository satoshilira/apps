import { Typography } from '../components/Typography';
import {useSacrifice} from '../hooks';
import {Col} from '../components/Col';
import {Countdown} from '../components';
import {useWagmiNetwork} from '../hooks/useChain';

export default function Sacrifice() {
  const {bonus, started, sacrified, sacrificable, end} = useSacrifice()
  console.log('sacrifice', {bonus, started})

  const { chain } = useWagmiNetwork()
  console.log('chain', chain)

  return (
    <Col>
      {!started ? (
        <>
          <Typography color="white">Satoshi LIRA Sacrifice</Typography>
          <Countdown date={end} />
          <Typography as="h5" color="white">Bonus: {bonus}%</Typography>
          <Typography as="h5" color="white">{sacrified}/{sacrificable}</Typography>
        </>
      ) : (
        <>
          <Typography color="white">Sacrifice Redeem</Typography>
        </>
      )}
    </Col>
  )
}
