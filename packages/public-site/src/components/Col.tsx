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

export type ColProps = FlexboxProps
  & SpaceProps
  & WidthProps
  & MaxWidthProps
  & HeightProps
  & BackgroundProps
  & DisplayProps
  & TextAlignProps

export const Col = styled.div<ColProps>`
  display: flex;
  flex-direction: column;

  ${flexbox}
  ${width}
  ${maxWidth}
  ${height}
  ${space}
  ${background}
  ${display}
  ${textAlign}
`;
