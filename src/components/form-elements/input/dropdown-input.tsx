import React from 'react';
import { FieldInputProps } from 'formik';
import styled from 'styled-components';

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
`;

interface Props {
  field: FieldInputProps<any>;
  options: any[];
}

const TextInput: React.FC<Props> = ({ options, field }) => {
  return (
    <StyledSelect {...field}>
      {options.map(({ value, label }) => (
        <option key={value} value={value} label={label} />
      ))}
    </StyledSelect>
  );
};

export default TextInput;
