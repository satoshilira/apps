import {useNetwork} from 'wagmi';

export function useWagmiNetwork() {
  const { chain } = useNetwork()

  return {
    chain,
  }
}
