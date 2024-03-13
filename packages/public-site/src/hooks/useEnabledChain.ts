import { useAccount } from 'wagmi';

const ENABLED_CHAINS = [
  42161, // arbitrum
  421613, // arbitrum goerli
  421614, // arbitrum sepolia
];

export function useEnabledChain() {
  const network = useAccount();

  if (!network || !network.chain) {
    return false;
  }

  return ENABLED_CHAINS.includes(network.chain.id);
}
