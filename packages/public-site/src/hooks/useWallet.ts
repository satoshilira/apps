import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export function useWallet() {
  const { address, isConnected, isDisconnected, status } = useAccount();

  console.log('wallet', address, status);

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

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
