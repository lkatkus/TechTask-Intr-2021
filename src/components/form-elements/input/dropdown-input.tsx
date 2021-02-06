import React from 'react';
import styled from 'styled-components';

import { InputLabel } from './components';

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
`;

interface Option {
  value: string | number;
  label: string;
}

interface Props {
  name: string;
  label?: string;
  value: string | number;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TextInput: React.FC<Props> = ({ name, label, value, options, onChange }) => (
  <div>
    {label && <InputLabel label={label} />}
    <StyledSelect data-testid={`${name}-data-testid`} name={name} value={value} onChange={onChange}>
      {options.map(({ value, label }) => (
        <option key={value} data-testid={`${name}-options-${value}`} value={value} label={label} />
      ))}
    </StyledSelect>
  </div>
);

export default TextInput;
