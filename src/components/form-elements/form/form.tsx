import React from 'react';

interface Props {
  handleSubmit: any;
  children: () => JSX.Element;
}

const Form = ({ handleSubmit, children }: Props): JSX.Element => {
  return <form onSubmit={handleSubmit}>{children()}</form>;
};

export default Form;
