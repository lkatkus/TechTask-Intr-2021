import React from 'react';
import { FieldInputProps } from 'formik';

interface Props {
  field: FieldInputProps<any>;
}

const TextInput: React.FC<Props> = ({ field }) => {
  return <input type="text" {...field} />;
};

export default TextInput;
