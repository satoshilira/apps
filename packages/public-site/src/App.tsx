import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';
import {createPublicClient, http} from 'viem'
import {arbitrum, arbitrumGoerli} from 'viem/chains';
import {WagmiConfig, createConfig} from 'wagmi'
import {Header} from "./components";
import {useLira, useSacrifice, useWallet} from './hooks';
import theme, {Colors} from "./theme";
import {Row} from "./components/Row";
import {Col} from "./components/Col";
import {Typography} from "./components/Typography";

import daVinciLira from './img/da-vinci-lira.svg'

import ApercuMonoProBold from './fonts/ApercuMonoProBold.ttf'
import ApercuMonoProLight from './fonts/ApercuMonoProLight.ttf'
import ApercuMonoProMedium from './fonts/ApercuMonoProMedium.ttf'
import ApercuMonoProRegular from './fonts/ApercuMonoProRegular.ttf'

import AvenirNextBold from './fonts/AvenirNextLTPro-Bold.otf'
import AvenirNextRegular from './fonts/AvenirNextLTPro-Regular.otf'
import AvenirNextLite from './fonts/AvenirNextLTPro-It.otf'

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: arbitrumGoerli,
    transport: http()
  }),
})

const StyledJumbotron = styled(Col)`
`

const ColorWrap = styled.span<{color: keyof Colors}>`
  color: ${({color, theme}) => theme.colors[color]};
`

function Home() {
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



const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Apercu Mono Pro";
    src: url(${ApercuMonoProBold}) format("truetype");
    font-weight: 700;
  }

  @font-face {
    font-family: "Apercu Mono Pro";
    src: url(${ApercuMonoProMedium}) format("truetype");
    font-weight: 300;
  }

  @font-face {
    font-family: "Apercu Mono Pro";
    src: url(${ApercuMonoProRegular}) format("truetype");
    font-weight: 500;
  }

  @font-face {
    font-family: "Apercu Mono Pro";
    src: url(${ApercuMonoProLight}) format("truetype");
    font-weight: 400;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextBold}) format("opentype");
    font-weight: 700;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextRegular}) format("opentype");
    font-weight: 500;
  }

  @font-face {
    font-family: "Avenir Next";
    src: url(${AvenirNextLite}) format("opentype");
    font-weight: 400;
  }

  html, body {
    font-family: ${props => props.theme.fontFamilies.primary};
  }

  body {
    min-height: 100vh;
    margin: 0;
    background-color: ${props => props.theme.colors.dark};
    font-family: ${props => props.theme.fontFamilies.primary};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-image: url(${daVinciLira});
    background-repeat: no-repeat;
    background-position: right -30%;
  }
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <WagmiConfig config={config}>
        <Col>
          <Header />

          <Col marginX="20%">
            <Col>
              <Typography as="h2" color="white" fontFamily="secondary">
                CRYPTOCURRENCY <br />GLOBAL <ColorWrap color="primary">REVOLUTION</ColorWrap>
              </Typography>
            </Col>
          </Col>
        </Col>



        <Home/>
      </WagmiConfig>
    </ThemeProvider>
  )
}
