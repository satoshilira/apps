import styled from 'styled-components'
import {
  color,
  ColorProps,
  compose,
  flexGrow,
  FlexGrowProps,
  fontSize,
  FontSizeProps,
  space,
  SpaceProps,
  system,
  typography,
  TypographyProps as StyledTypographyProps
} from 'styled-system'
import {Colors, FontFamilies, FontSizes} from '../theme';

export const Text = styled('p')(
  compose(
    typography,
    space,
    color
  )
)

export interface TypographyProps extends SpaceProps, ColorProps, StyledTypographyProps, FontSizeProps, FlexGrowProps {
  as?: keyof FontSizes
  fontFamily?: keyof FontFamilies
  fontSize?: keyof FontSizes
  color?: keyof Colors
  wordBreak?: string
}

const wordBreak = system({
  wordBreak: {
    property: 'wordBreak'
  }
})

const customProps = () => {
  return system({ wordBreak: true, whiteSpace: true })
}

export const Typography = styled(Text)<TypographyProps>`
  color: ${({ color, theme }) => theme.colors[color || 'white']};
  font-family: ${({ fontFamily, theme }) => theme.fontFamilies[fontFamily || 'primary']};
  font-size: ${({ as, fontSize, theme }) => theme.fontSizes[fontSize || as || 'p']};
  line-height: ${({ as, fontSize, theme }) => theme.lineHeights[fontSize || as || 'p']};
  
  ${fontSize}
  ${flexGrow}
  ${customProps}
`
