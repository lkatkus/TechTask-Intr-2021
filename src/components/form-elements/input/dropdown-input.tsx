import React from 'react';
import styled from 'styled-components';

import { InputLabel } from './components';

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
`;

interface Props {
  name: string;
  label: string;
  value: number;
  options: any[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TextInput: React.FC<Props> = ({ name, label, value, options, onChange }) => (
  <div>
    {label && <InputLabel label={label} />}
    <StyledSelect name={name} value={value} onChange={onChange}>
      {options.map(({ value, label }) => (
        <option key={value} value={value} label={label} />
      ))}
    </StyledSelect>
  </div>
);

export default TextInput;
