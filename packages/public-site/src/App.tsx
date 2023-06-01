import {ThemeProvider} from 'styled-components';
import {createPublicClient, http} from 'viem'
import {arbitrum, arbitrumGoerli} from 'viem/chains';
import {createConfig, WagmiConfig} from 'wagmi'
import {Header} from './components';
import {useLira, useSacrifice, useWallet} from './hooks';
import theme from './theme';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Tokens from './pages/Tokens';
import Sacrifice from './pages/Sacrifice';
import BlockchainData from './pages/BlockchainData';
import {GlobalStyles} from './components/ui';

// TODO: refactor to custom hook (eg add chain)
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: arbitrum,
    transport: http()
  }),
})

function HomeOld() {
  const {address, isConnected} = useWallet()
  console.log('home', address, isConnected)

  const {totalSupply, lockedSupply, isLoadingTotalSupply, isLoadingLockedSupply} = useLira()
  const {bonus, sacrified, start, end, sacrificable, isLoadingSacrifice} = useSacrifice();

  console.log('round', {bonus, sacrified, start, end, sacrificable, isLoadingSacrifice})

  return (
    <div>
      isConnected: {isConnected ? 'true' : 'false'}
      <br/>
      totalSupply: {!isLoadingTotalSupply && totalSupply?.toString()}
      <br/>
      lockedSupply: {!isLoadingLockedSupply && lockedSupply?.toString()}
      <br/>
      bonus: {!isLoadingSacrifice && bonus}
      <br/>
      sacrified: {!isLoadingSacrifice && sacrified}
      <br/>
      sacrificable: {!isLoadingSacrifice && sacrificable}
      <br/>
      end: {!isLoadingSacrifice && new Date(end * 1000).toISOString()}
      <br/>
      start: {!isLoadingSacrifice && new Date(start * 1000).toISOString()}
      <br/>
      <br/>


    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <WagmiConfig config={config}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/tokens' element={<Tokens />} />
            <Route path='/sacrifice' element={<Sacrifice />} />
            <Route path='/blockchain-data' element={<BlockchainData />} />
          </Routes>
        </BrowserRouter>

      </WagmiConfig>
    </ThemeProvider>
  )
}
