import React from 'react';
import { FieldInputProps } from 'formik';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
`;

interface Props {
  field: FieldInputProps<any>;
}

const TextInput: React.FC<Props> = ({ field }) => {
  return <StyledInput type="text" {...field} />;
};

export default TextInput;
