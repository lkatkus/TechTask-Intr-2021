import styled from 'styled-components';
import { FlexboxProps, SpaceProps, LayoutProps, flexbox, space, layout } from 'styled-system';

export type Props = FlexboxProps & SpaceProps & LayoutProps;

export default styled.div<Props>`
  ${flexbox}
  ${layout}
  ${space}
`;
