import React from 'react';
import styled from 'styled-components';
import { ColorProps, SpaceProps, TypographyProps, color, space, typography } from 'styled-system';

type BaseProps = ColorProps & SpaceProps & TypographyProps;

const TextBase = styled.div<BaseProps>`
  margin: 0;
  padding: 0;
  font-family: 'Open Sans';

  ${color}
  ${space}
  ${typography}
`;

const Body: React.FC<BaseProps> = ({ children }) => (
  <TextBase as="p" fontSize={16}>
    {children}
  </TextBase>
);

const Heading1: React.FC<BaseProps> = ({ children }) => (
  <TextBase as="h1" fontSize={32} textAlign="center">
    {children}
  </TextBase>
);

const Text = {
  Heading1,
  Body,
};

export default Text;
