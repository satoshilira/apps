import { useAccount, useConnect, useContractRead, useContractWrite, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected'
import lira from '@satoshi-lira/deployments/arbitrum/LIRA.json'
import sacrifice from '@satoshi-lira/deployments/arbitrumGoerli/LIRASacrifice.json'
import { BigNumber } from 'ethers';
import { EthereumAddress } from '../types';

export function useWallet() {
  const { address, isConnected } = useAccount()

  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })

  const { disconnect } = useDisconnect()

  return {
    address,
    isConnected,
    connect,
    disconnect,
  }
}

export function useLira() {
  const { data: totalSupply, isLoading: isLoadingTotalSupply } = useContractRead({
    abi: lira.abi,
    address: lira.address as EthereumAddress,
    functionName: 'totalSupply'
  })

  const { data: lockedSupply, isLoading: isLoadingLockedSupply } = useContractRead({
    abi: lira.abi,
    address: lira.address as EthereumAddress,
    functionName: 'lockedSupply'
  })

  const intrinsicValue = BigNumber.from(lockedSupply || 0).toNumber() / BigNumber.from(totalSupply || 0).div(BigNumber.from(10).pow(8)).toNumber()

  return {
    totalSupply: BigNumber.from(totalSupply || 0).div(BigNumber.from(10).pow(8)),
    isLoadingTotalSupply,
    intrinsicValue,
    lockedSupply,
    isLoadingLockedSupply,
  }
}

export function useSacrifice() {
  const { data: started, isLoading: isLoadingStarted } = useContractRead({
    abi: sacrifice.abi,
    address: sacrifice.address as EthereumAddress,
    functionName: 'started',
  })

  const { data: round, isLoading: isLoadingRound, refetch: refetchRound } = useContractRead({
    abi: sacrifice.abi,
    address: sacrifice.address as EthereumAddress,
    functionName: 'round',
    watch: !!started,
    enabled: !!started,
  })

  const { data: sacrificable, isLoading: isLoadingSacrificable } = useContractRead({
    abi: sacrifice.abi,
    address: sacrifice.address as EthereumAddress,
    functionName: 'sacrificable',
  })

  const {
    data: sacrificeTransaction,
    isLoading: isLoadingSacrifceTransacion,
    isSuccess: sacrificeTransactionSuccess,
    write: writeSacrificeTransaction
  } = useContractWrite({
    abi: sacrifice.abi,
    address: sacrifice.address as EthereumAddress,
    functionName: 'sacrifice',
  })

  return {
    started,
    isLoadingStarted,
    // TODO: typings
    // @ts-ignore
    bonus: Number(round?.bonus) || 0,
    // @ts-ignore
    sacrified: Number(round?.sacrified) || 0,
    // @ts-ignore
    start: new Date(Number(round?.start) * 1000) || 0,
    // @ts-ignore
    end: new Date(Number(round?.end) * 1000) || 0,
    // @ts-ignore
    sacrificable: Number(sacrificable) - Number(round?.sacrified),
    isLoadingSacrifice: !(!isLoadingSacrificable && !isLoadingRound),
    refetchRound,

    sacrificeTransaction,
    isLoadingSacrifceTransacion,
    sacrificeTransactionSuccess,
    writeSacrificeTransaction,
  }
}
