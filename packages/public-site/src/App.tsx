import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { Footer, Header } from './components';
import { GlobalStyles } from './components/ui';
import theme from './theme';
import { Home } from './pages/Home';
import Tokens from './pages/Tokens';
// import Sacrifice from './pages/Sacrifice';
import BlockchainData from './pages/BlockchainData';
import { Presale } from './pages/Presale';
import { arbitrum, arbitrumSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export const config = createConfig({
  chains: [arbitrum, arbitrumSepolia],
  transports: {
    [arbitrum.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tokens" element={<Tokens />} />
              <Route path="/presale" element={<Presale />} />
              {/*<Route path="/sacrifice" element={<Sacrifice />} />*/}
              <Route path="/blockchain-data" element={<BlockchainData />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
}
