import { useNetwork } from 'wagmi';
import { Col } from '../../components/Col';
import { Typography } from '../../components/Typography';
import { useWallet } from '../../hooks';

export function Presale() {
  const wallet = useWallet();
  const network = useNetwork();

  return (
    <Col style={{ minHeight: '100vh' }} alignItems="center">
      <Typography as="h5" color="white">Wallet</Typography>
      <Typography color="white">{wallet.status}</Typography>

      <Typography as="h5" color="white">Network</Typography>
      <Typography color="white">{network.chain?.name}</Typography>
      <Typography color="white">{network.chain?.id}</Typography>
      <Typography color="white">{JSON.stringify(network.chain, null, 2)}</Typography>
    </Col>
  );
}
