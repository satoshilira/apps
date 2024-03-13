import arbitrumGoerliWbtc from '@satoshi-lira/deployments/arbitrumGoerli/MockWBTC.json'
import arbitrumGoerliSacrifice from '@satoshi-lira/deployments/arbitrumGoerli/LIRASacrifice.json'
import { Chain } from 'viem';


export function getWbtcAddress(network?: Chain & { unsupported?: boolean | undefined; }) {
  switch(network) {
    default:
      return arbitrumGoerliWbtc.address
  }
}

export function getSacrificeAddress(network?: Chain & { unsupported?: boolean | undefined; }) {
  switch(network) {
    default:
      return arbitrumGoerliSacrifice.address
  }
}
