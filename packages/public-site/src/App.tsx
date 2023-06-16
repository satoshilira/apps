import {ThemeProvider} from 'styled-components';
import {createPublicClient, http} from 'viem'
import {arbitrum, arbitrumGoerli} from 'viem/chains';
import {createConfig, WagmiConfig} from 'wagmi'
import {Footer, Header} from './components';
import {useLira, useSacrifice, useWallet} from './hooks';
import theme from './theme';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Tokens from './pages/Tokens';
import Sacrifice from './pages/Sacrifice';
import BlockchainData from './pages/BlockchainData';
import {GlobalStyles} from './components/ui';
import {Col} from "./components/Col";

// TODO: refactor to custom hook (eg add chain)
const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: arbitrum,
    transport: http()
  }),
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <WagmiConfig config={config}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/tokens' element={<Tokens/>}/>
            <Route path='/sacrifice' element={<Sacrifice/>}/>
            <Route path='/blockchain-data' element={<BlockchainData/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </WagmiConfig>
    </ThemeProvider>
  )
}
