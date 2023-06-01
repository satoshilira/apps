import {useAccount, useConnect, useContractRead, useDisconnect} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected'
import lira from './abi/arbitrum/lira.json'
import sacrifice from './abi/arbitrum/sacrifice.json'
import {BigNumber} from "ethers";

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

  const intrinsicValue = BigNumber.from(lockedSupply).toNumber() / BigNumber.from(totalSupply).div(BigNumber.from(10).pow(8)).toNumber()

  return {
    totalSupply: BigNumber.from(totalSupply).div(BigNumber.from(10).pow(8)),
    isLoadingTotalSupply,
    intrinsicValue,
    lockedSupply,
    isLoadingLockedSupply,
  }
}

export function useSacrifice() {
  const address = '0x1F377350677C51d6469a6A781Da58d8a9A554012'

  const {data: round, isLoading: isLoadingRound} = useContractRead({
    abi: sacrifice,
    address,
    functionName: 'round',
  })

  const {data: sacrificableAmount, isLoading: isLoadingSacrificableAmount} = useContractRead({
    abi: sacrifice,
    address,
    functionName: 'sacrificableAmount',
  })

  return {
    // TODO: typings
    // @ts-ignore
    bonus: Number(round?.bonus) || 0,
    // @ts-ignore
    sacrified: Number(round?.sacrified) || 0,
    // @ts-ignore
    start: Number(round?.start) || 0,
    // @ts-ignore
    end: Number(round?.end) || 0,
    // @ts-ignore
    sacrificable: Number(sacrificableAmount) - Number(round?.sacrified),
    isLoadingSacrifice: !(!isLoadingSacrificableAmount && !isLoadingRound),
  }
}
