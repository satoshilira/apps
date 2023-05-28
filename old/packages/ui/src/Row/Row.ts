import styled from 'styled-components';
import { flexbox } from 'styled-system';

import type { FlexboxProps } from 'styled-system'

export const Row = styled.div<FlexboxProps>`
  display: flex;

  ${flexbox}
`;
