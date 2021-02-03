import React from 'react';
import { FieldInputProps } from 'formik';

interface Props {
  field: FieldInputProps<any>;
  options: any[];
}

const TextInput: React.FC<Props> = ({ options, field }) => {
  return (
    <select {...field}>
      <option />
      {options.map(({ value, label }) => (
        <option key={value} value={value} label={label} />
      ))}
    </select>
  );
};

export default TextInput;
