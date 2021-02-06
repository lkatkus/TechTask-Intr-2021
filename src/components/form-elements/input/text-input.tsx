import React from 'react';
import styled from 'styled-components';

import { InputLabel } from './components';

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
`;

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<Props> = ({ name, label, placeholder, value, onChange }) => (
  <div>
    {label && <InputLabel label={label} />}
    <StyledInput
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

export default TextInput;
