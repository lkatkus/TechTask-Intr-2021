import React from 'react';
import { Field as FormikField } from 'formik';

import { FieldLabel } from './components';

interface Props {
  label: string;
  name: string;
  // @TODO add proper component typing
  component: any;
  options?: any[];
}

const Field: React.FC<Props> = ({ label, name, component, options }) => (
  <div>
    <FieldLabel label={label} />
    <FormikField name={name} component={component} options={options} />
  </div>
);

export default Field;
