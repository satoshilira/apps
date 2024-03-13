import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors'

export function useWallet() {
  const { address, isConnected, isDisconnected, status } = useAccount();

  console.log('wallet', address, status);

  const { connect } = useConnect()

  const { disconnect } = useDisconnect();

  return {
    address,
    isConnected,
    isDisconnected,
    connect,
    disconnect,
    status,
  };
}
