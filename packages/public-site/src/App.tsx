import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import {configureChains, createConfig, WagmiConfig} from 'wagmi'
import {arbitrum, arbitrumGoerli} from 'viem/chains';
import {publicProvider} from 'wagmi/providers/public'
import {Footer, Header} from './components';
import {GlobalStyles} from './components/ui';
import theme from './theme';
import {Home} from './pages/Home';
import Tokens from './pages/Tokens';
import Sacrifice from './pages/Sacrifice';
import BlockchainData from './pages/BlockchainData';

const { publicClient, webSocketPublicClient } = configureChains(
  [arbitrum, arbitrumGoerli],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
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
