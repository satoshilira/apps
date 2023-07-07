import styled from 'styled-components'
import { compose, typography, space, color, SpaceProps, ColorProps, TypographyProps as StyledTypographyProps, fontSize, FontSizeProps, flexGrow, FlexGrowProps } from 'styled-system'
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
}

export const Typography = styled(Text)<TypographyProps>`
  color: ${({ color, theme }) => theme.colors[color || 'white']};
  font-family: ${({ fontFamily, theme }) => theme.fontFamilies[fontFamily || 'primary']};
  font-size: ${({ as, fontSize, theme }) => theme.fontSizes[fontSize || as || 'p']};

  ${fontSize}
  ${flexGrow}
`
