import styled from 'styled-components';
import {Row, RowProps} from './Row';

export type ColProps = RowProps

export const Col = styled(Row)<ColProps>`
  flex-direction: column;
`;
