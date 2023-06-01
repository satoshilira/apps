export interface FontSizes {
  h1: string
  h2: string
  h3: string
  h4: string
  h5: string
  h6: string
  button: string
  body: string
  subtitle: string
  p: string
  caption: string
}

export interface FontFamilies {
  primary: string
  secondary: string
}

export interface Colors {
  dark: string
  white: string
  'white-80': string
  primary: string
  secondary: string
  emphasis: {
    high: string
    medium: string
    disabled: string
  },
  grays: {
    '50': string
    '100': string
    '200': string
    '300': string
    '400': string
    '500': string
    '600': string
    '700': string
    '800': string
    '900': string
  },
  horizontalGreenToCyan: string
  verticalGreenToTransparent: string
  verticalWhiteToTransparent: string
}

export interface Theme {
  fontSizes: FontSizes,
  fontFamilies: FontFamilies,
  colors: Colors,
}

const fontSizes: FontSizes = {
  h1: '104px',
  h2: '96px',
  h3: '80px',
  h4: '48px',
  h5: '40px',
  h6: '32px',
  button: '40px',
  body: '28px',
  subtitle: '26px',
  p: '18px',
  caption: '16px',
}

const fontFamilies: FontFamilies = {
  primary: 'Apercu Mono Pro',
  secondary: 'Avenir Next',
}

const colors: Colors = {
  dark: '#0A0A0A',
  white: '#FFFFFF',
  'white-80': 'rgba(255,255,255,0.8)',
  primary: '#B6FE46',
  secondary: '#09FEF5',
  emphasis: {
    high: '#FFFFFF',
    medium: 'rgba(255, 255, 255, 0.8)',
    disabled: 'rgba(255, 255, 255, 0.38)',
  },
  grays: {
    '50': '#F8F9FA',
    '100': '#EBEDEF',
    '200': '#DDE1E4',
    '300': '#CED3D8',
    '400': '#BDC4CB',
    '500': '#AAB4BC',
    '600': '#95A1AC',
    '700': '#808A93',
    '800': '#646D74',
    '900': '#3B3F44',
  },
  horizontalGreenToCyan: 'linear-gradient(94.56deg, #B6FE46 7.15%, rgba(9, 254, 245, 0.6) 90.05%)',
  verticalGreenToTransparent: 'linear-gradient(180deg, rgba(182, 254, 70, 0.8) 0%, rgba(217, 217, 217, 0) 100%)',
  verticalWhiteToTransparent: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 7.41%, rgba(255, 255, 255, 0) 85.19%)',
}

const theme = {
  fontSizes,
  fontFamilies,
  colors,
}

export default theme
