import React from 'react';

import { Box, BoxProps } from 'src/core';

type Props = BoxProps;

const GridRow: React.FC<Props> = ({ children, ...rest }) => (
  <Box width="100%" display="flex" flexWrap="wrap" flexDirection="row" {...rest}>
    {children}
  </Box>
);

export default GridRow;
