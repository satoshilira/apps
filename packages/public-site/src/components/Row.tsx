import styled from 'styled-components';
import {
  background,
  BackgroundProps,
  display,
  DisplayProps,
  flexbox,
  FlexboxProps,
  height,
  HeightProps,
  maxWidth,
  MaxWidthProps,
  space,
  SpaceProps,
  textAlign,
  TextAlignProps,
  width,
  WidthProps,
} from 'styled-system';

export type RowProps =
  FlexboxProps
  & SpaceProps
  & WidthProps
  & MaxWidthProps
  & HeightProps
  & BackgroundProps
  & DisplayProps
  & TextAlignProps

export const Row = styled.div<RowProps>`
  display: flex;

  ${flexbox}
  ${width}
  ${maxWidth}
  ${height}
  ${space}
  ${background}
  ${display}
  ${textAlign}
`;
