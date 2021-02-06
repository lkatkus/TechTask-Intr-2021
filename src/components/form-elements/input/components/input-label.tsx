import React from 'react';
import styled from 'styled-components';

import { Box } from 'src/core';

const StyledLabel = styled.div``;

interface Props {
  label: string;
}

const FieldLabel: React.FC<Props> = ({ label }) => (
  <Box mb={10}>
    <StyledLabel>{label}</StyledLabel>
  </Box>
);

export default FieldLabel;
