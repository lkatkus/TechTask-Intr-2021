import React, { PropsWithChildren } from 'react';
import { Formik, Form as FormikForm } from 'formik';

interface FormData<T> {
  values: T;
}

interface FormActions<T> {
  setFieldValue: (field: string, value: string | number) => void;
  setValues: (values: T) => void;
}
interface Props<T> {
  handleSubmit: (values: T) => void;
  initialValues: T;
  children: (d: FormData<T>, a: FormActions<T>) => JSX.Element;
}

const Form = <T,>({
  handleSubmit,
  initialValues,
  children,
}: PropsWithChildren<Props<T>>): JSX.Element => (
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    {({ values, setFieldValue, setValues }) => (
      <FormikForm>{children({ values }, { setFieldValue, setValues })}</FormikForm>
    )}
  </Formik>
);

export default Form;
