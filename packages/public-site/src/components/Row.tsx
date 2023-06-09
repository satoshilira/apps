import styled from 'styled-components';
import {
  background, BackgroundProps,
  flexbox, FlexboxProps,
  height, HeightProps,
  space, SpaceProps,
  width, WidthProps,
  maxWidth, MaxWidthProps, display, DisplayProps,
} from 'styled-system';

export type RowProps = FlexboxProps & SpaceProps & WidthProps & MaxWidthProps & HeightProps & BackgroundProps & DisplayProps

export const Row = styled.div<RowProps>`
  display: flex;

  ${flexbox}
  ${width}
  ${maxWidth}
  ${height}
  ${space}
  ${background}
  ${display}
`;
