import { Col } from '../components/Col';
import { useWallet } from '../hooks';
import { Typography } from '../components/Typography';
import { ConnectButton } from '../components/ConnectButton/ConnectButton';
import { useEffect } from 'react';
import { Row } from '../components/Row';
import { useAccount } from 'wagmi';

export default function BlockchainData() {
  const { isConnected, isDisconnected, status } = useWallet();
  const network = useAccount();

  useEffect(() => {
    console.log('wallet.status', status);
  }, [status])

  return (
    <Col style={{ minHeight: '100vh', maxWidth: 1280, margin: '0 auto' }} alignItems="center">
      <Row width="100%" justifyContent="space-between" alignItems="center">
        <Typography as="h5" color="white">Wallet</Typography>
        <ConnectButton />
      </Row>

      {isConnected && (
        <Col width="100%" marginBottom={60}>
          <Typography color="white">status: {status}</Typography>
        </Col>
      )}

      {isConnected && (
        <Col width="100%" marginBottom={60}>
          <Typography as="h5" color="white">Network</Typography>
          <Typography color="white">Chain ID: {network.chain?.id}</Typography>
          <Typography color="white">{network.chain?.id}</Typography>
        </Col>
      )}
    </Col>
  )
}
