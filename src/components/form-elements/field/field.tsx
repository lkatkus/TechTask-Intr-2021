import React from 'react';
import { Field as FormikField } from 'formik';

interface Props {
  label: string;
  name: string;
  // @TODO add proper component typing
  component: any;
  options?: any[];
}

const Field: React.FC<Props> = ({ label, name, component, options }) => (
  <div>
    <div>{label}</div>
    <FormikField name={name} component={component} options={options} />
  </div>
);

export default Field;
