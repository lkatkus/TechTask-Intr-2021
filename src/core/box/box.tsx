import styled from 'styled-components';
import {
  BackgroundProps,
  BorderProps,
  FlexboxProps,
  SpaceProps,
  LayoutProps,
  flexbox,
  space,
  layout,
  background,
  border,
} from 'styled-system';

export type Props = BackgroundProps & BorderProps & FlexboxProps & SpaceProps & LayoutProps;

export default styled.div<Props>`
  ${flexbox}
  ${layout}
  ${space}
  ${background}
  ${border}
`;
