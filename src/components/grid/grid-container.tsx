import React from 'react';

import { Box, BoxProps } from 'src/core';

type Props = BoxProps;

const GridContainer: React.FC<Props> = ({ children, ...rest }) => (
  <Box width="100%" display="flex" alignItems="center" flexDirection="column" {...rest}>
    {children}
  </Box>
);

export default GridContainer;
