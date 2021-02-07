import React from 'react';

import { Box, Text } from 'src/core';

interface Props {
  label: string;
}

const FieldLabel: React.FC<Props> = ({ label }) => (
  <Box mb={10}>
    <Text.Body>{label}</Text.Body>
  </Box>
);

export default FieldLabel;
