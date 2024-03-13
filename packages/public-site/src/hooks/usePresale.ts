import { useAccount, useReadContract } from 'wagmi';
import { useMemo } from 'react';
import { EthereumAddress } from '../types';
import presaleSepolia from '@satoshi-lira/deployments/arbitrumSepolia/LiraDaoPresale.json';

const ENABLED_CHAINS = [
  42161, // arbitrum
  421613, // arbitrum goerli
  421614, // arbitrum sepolia
];

export function usePresale() {
  const { chain } = useAccount();

  const chainEnabled = useMemo<boolean>(() => !!(chain && chain.id && ENABLED_CHAINS.includes(chain.id)), [chain]);

  const address = useMemo<EthereumAddress>(() => {
    switch (chain?.id) {
      case 421614:
        console.log('sepolia');
        return presaleSepolia.address as EthereumAddress;
      default:
        return '0x';
    }
  }, [chain]);

  const { data: started } = useReadContract({
    abi: liraDaoPresaleAbi,
    address,
    functionName: 'started',
    query: {
      enabled: chainEnabled,
    }
  });

  const { data: round } = useReadContract({
    abi: roundAbi,
    address,
    functionName: 'round',
    query: {
      enabled: chainEnabled,
    }
  })

  return {
    address,
    started,
    round,
  }
}