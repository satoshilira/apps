import {useAccount, useConnect, useContractRead, useDisconnect} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected'
import lira from './abi/arbitrum/lira.json'
import sacrifice from '@satoshi-lira/deployments/arbitrumGoerli/LIRASacrifice.json'
import {BigNumber} from "ethers";
import {EthereumAddress} from "../types";
import {useCallback} from "react";

export function useWallet() {
  const { address, isConnected } = useAccount()
  console.log(address, isConnected)

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
  const address = '0xA07ac236fEBc390c798504E927DC8D6a4e1FfcA3'

  const {data: totalSupply, isLoading: isLoadingTotalSupply} = useContractRead({
    abi: lira,
    address,
    functionName: 'totalSupply'
  })

  const {data: lockedSupply, isLoading: isLoadingLockedSupply} = useContractRead({
    abi: lira,
    address,
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
  const {data: started, isLoading: isLoadingStarted} = useContractRead({
    abi: sacrifice.abi,
    address: sacrifice.address as EthereumAddress,
    functionName: 'started',
  })

  const {data: round, isLoading: isLoadingRound, refetch: refetchRound} = useContractRead({
    abi: sacrifice.abi,
    address: sacrifice.address as EthereumAddress,
    functionName: 'round',
    watch: !!started,
    enabled: !!started,
  })

  const {data: sacrificableAmount, isLoading: isLoadingSacrificableAmount} = useContractRead({
    abi: sacrifice.abi,
    address: sacrifice.address as EthereumAddress,
    functionName: 'sacrificableAmount',
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
    sacrificable: Number(sacrificableAmount) - Number(round?.sacrified),
    isLoadingSacrifice: !(!isLoadingSacrificableAmount && !isLoadingRound),
    refetchRound,
  }
}
