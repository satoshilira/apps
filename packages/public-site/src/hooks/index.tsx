import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import lira from '@satoshi-lira/deployments/arbitrum/LIRA.json';
import wbtc from '@satoshi-lira/deployments/arbitrumGoerli/MockWBTC.json';
import sacrifice from '@satoshi-lira/deployments/arbitrumGoerli/LIRASacrifice.json';
import { BigNumber } from 'ethers';
import { EthereumAddress } from '../types';
import { useMemo } from 'react';
import { useWallet } from './useWallet';

export * from './useWallet';

const ENABLED_CHAINS = [
  42161, // arbitrum
  421613, // arbitrum goerli
  421614, // arbitrum sepolia
];

export const useWbtcBalance = () => {
  const { address } = useWallet();

  const { data: wbtcBalance, isLoading: isWbtcBalanceLoading, isError: isWbtcBalanceError } = useReadContract({
    abi: wbtc.abi,
    address: wbtc.address as EthereumAddress,
    functionName: 'balanceOf',
    args: [address],
  });

  return {
    wbtcBalance,
    isWbtcBalanceLoading,
    isWbtcBalanceError,
  };
};

export function useLira() {
  const { chain } = useAccount();

  const { data: totalSupply, isLoading: isLoadingTotalSupply } = useReadContract({
    abi: lira.abi,
    address: lira.address as EthereumAddress,
    functionName: 'totalSupply',
  });

  const { data: lockedSupply, isLoading: isLoadingLockedSupply } = useReadContract({
    abi: lira.abi,
    address: lira.address as EthereumAddress,
    functionName: 'lockedSupply',
  });

  const intrinsicValue = BigNumber.from(lockedSupply || 0).toNumber() / BigNumber.from(totalSupply || 0).div(BigNumber.from(10).pow(8)).toNumber();

  return {
    totalSupply: BigNumber.from(totalSupply || 0).div(BigNumber.from(10).pow(8)),
    isLoadingTotalSupply,
    intrinsicValue,
    lockedSupply,
    isLoadingLockedSupply,
  };
}

export function useSacrifice() {
  const { chain } = useAccount();

  const chainEnabled = useMemo<boolean>(() => !!(chain && chain.id && ENABLED_CHAINS.includes(chain.id)), [chain]);

  const address = useMemo<EthereumAddress>(() => {
    switch (chain?.id) {
      case 421613:
        return sacrifice.address as EthereumAddress;
      default:
        return '0x';
    }
  }, [chain]);

  const { data: started, isLoading: isLoadingStarted } = useReadContract({
    abi: sacrifice.abi,
    address,
    functionName: 'started',
    query: {
      enabled: chainEnabled,
    }
  });

  const { data: ended, isLoading: isLoadingEnded } = useReadContract({
    abi: sacrifice.abi,
    address,
    functionName: 'ended',
    query: {
      enabled: chainEnabled,
    }
  });

  const { data: round, isLoading: isLoadingRound, refetch: refetchRound } = useReadContract({
    abi: sacrifice.abi,
    address,
    functionName: 'round',
    query: {
      enabled: chainEnabled,
    }
  });

  const { data: sacrificable, isLoading: isLoadingSacrificable } = useReadContract({
    abi: sacrifice.abi,
    address,
    functionName: 'sacrificable',
    query: {
      enabled: chainEnabled,
    },
  });

  const { data: sacrifices, isLoading: isLoadingSacrifices } = useReadContract({
    abi: sacrifice.abi,
    address,
    functionName: 'sacrifices',
    query: {
      enabled: chainEnabled,
    }
  });

  // const {
  //   data: sacrificeTransaction,
  //   isLoading: isLoadingSacrifceTransacion,
  //   isSuccess: sacrificeTransactionSuccess,
  //   write: writeSacrificeTransaction,
  //   error: sacrificeError,
  // } = useWriteContract({
  //   abi: sacrifice.abi,
  //   address,
  //   functionName: 'sacrifice',
  // });

  // const {
  //   data: approveTransaction,
  //   isLoading: isLoadingApproveTransacion,
  //   isSuccess: approveTransactionSuccess,
  //   write: writeApproveTransaction,
  // } = useWriteContract({
  //   abi: wbtc.abi,
  //   address: wbtc.address as EthereumAddress,
  //   functionName: 'approve',
  // });

  const { address: walletAddress } = useWallet();

  // const { data: allowance, isLoading: isAllowanceLoading } = useReadContract({
  //   abi: wbtc.abi,
  //   address: wbtc.address as EthereumAddress,
  //   functionName: 'allowance',
  //   enabled: chainEnabled,
  //   watch: chainEnabled,
  //   args: [walletAddress, address],
  // });

  return {
    // TODO: typing lib
    // allowance: BigNumber.from(allowance ? allowance : 0),
    // approveTransaction,
    // approveTransactionSuccess,
    // @ts-ignore
    bonus: round?.bonus !== undefined ? Number(round?.bonus) : 0,
    // @ts-ignore
    end: new Date(Number(round?.end) * 1000) || 0,
    ended,
    // isLoadingApproveTransacion,
    isLoadingEnded,
    // isLoadingSacrifceTransacion,
    isLoadingSacrificable,
    isLoadingSacrifice: isLoadingRound,
    isLoadingSacrifices,
    isLoadingStarted,
    refetchRound,
    sacrificable: sacrificable ? BigNumber.from(sacrificable) : 0,
    // @ts-ignore
    sacrificeError: sacrificeError?.cause?.reason,
    // sacrificeTransaction,
    // sacrificeTransactionSuccess,
    sacrifices: sacrifices || [],
    // @ts-ignore
    sacrified: Number(round?.sacrified) || 0,
    // @ts-ignore
    start: new Date(Number(round?.start) * 1000) || 0,
    started,
    // writeApproveTransaction,
    // writeSacrificeTransaction,
  };
}
