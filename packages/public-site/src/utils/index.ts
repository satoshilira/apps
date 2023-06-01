import {BigNumber, utils} from 'ethers';

// TODO: refactor signature to (value: BigInt, options: FormatOptions)
export const formatUint256 = (uint256Value: BigNumber, decimalPlaces: number, showDecimals = true, padDecimals: number) => {
  const numberString = utils.formatUnits(uint256Value, decimalPlaces);

  const [integerPart, decimalPart] = numberString.split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '’');

  let formattedDecimalPart = decimalPart || '';

  if (showDecimals) {
    formattedDecimalPart = formattedDecimalPart.padEnd(padDecimals || decimalPlaces, '0');
    formattedDecimalPart = formattedDecimalPart.slice(0, padDecimals || decimalPlaces);
  }

  let formattedNumber = formattedIntegerPart;
  if (showDecimals && formattedDecimalPart !== '') {
    formattedNumber += `.${formattedDecimalPart}`;
  }

  return formattedNumber;
};
