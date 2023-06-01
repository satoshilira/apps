import styled from 'styled-components'
import {compose, typography, space, color, SpaceProps, ColorProps, TypographyProps as StyledTypographyProps} from 'styled-system'
import {FontFamilies, FontSizes} from "../theme";

export const Text = styled('p')(
  compose(
    typography,
    space,
    color
  )
)

export interface TypographyProps extends SpaceProps, ColorProps, StyledTypographyProps {
  as?: keyof FontSizes
  fontFamily?: keyof FontFamilies
}

export const Typography = styled(Text)<TypographyProps>`
  font-family: ${({fontFamily, theme}) => theme.fontFamilies[fontFamily || 'primary']};
  font-size: ${({as, theme}) => theme.fontSizes[as || 'p']};
`