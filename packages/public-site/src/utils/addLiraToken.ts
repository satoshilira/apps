import MetaMaskSDK from '@metamask/sdk';

const MMSDK = new MetaMaskSDK({});
export const ethereum = MMSDK.getProvider();

export async function addLiraToken() {
  const tokenAddress = '0xA07ac236fEBc390c798504E927DC8D6a4e1FfcA3';
  const tokenSymbol = 'LIRA';
  const tokenDecimals = 8;
  const tokenImage = 'https://gateway.pinata.cloud/ipfs/QmTEDNkK7Q1DwmKThDjujLFP214PZuMACZP4aampgfepw9';

  try {
    // wasAdded is a boolean. Like any RPC method, an error can be thrown.
    const wasAdded = await ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC-20 tokens, but eventually more!
        options: {
          address: tokenAddress, // The address of the token.
          symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
          decimals: tokenDecimals, // The number of decimals in the token.
          image: tokenImage, // A string URL of the token logo.
        },
      },
    });

    if (wasAdded) {
      console.log('Thanks for your interest!');
    } else {
      console.log('wan not added!');
    }
  } catch (error) {
    console.log(error);
  }
}
