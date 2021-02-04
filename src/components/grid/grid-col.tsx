import React from 'react';

import { Box, BoxProps } from 'src/core';

const GRID_SIZE = 12;

interface Props extends BoxProps {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

const GridRow: React.FC<Props> = ({ size = 12, children, ...rest }) => {
  const parsedWidth = (100 / GRID_SIZE) * size;

  return (
    <Box width={`${parsedWidth}%`} {...rest}>
      {children}
    </Box>
  );
};

export default GridRow;
