import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import TextInput from './text-input';

describe('TextInput', () => {
  it('renders text input with provided params', () => {
    const { getByTestId, getByText } = render(
      <TextInput name="input-name" label="input-label" value="input-value" onChange={() => null} />,
    );

    const Input = getByTestId('input-name-data-testid');

    expect(Input).toHaveAttribute('type', 'text');
    expect(Input).toHaveAttribute('name', 'input-name');
    expect(Input).toHaveAttribute('value', 'input-value');
    expect(getByText('input-label')).toBeInTheDocument();
  });

  it('uses the provided onChange, when value is being changed', () => {
    let calledOnChange = false;

    const { getByTestId } = render(
      <TextInput
        name="input-name"
        label="input-label"
        value="input-value"
        onChange={() => {
          calledOnChange = true;
        }}
      />,
    );

    fireEvent.change(getByTestId('input-name-data-testid'), { target: { value: 'someValue' } });

    expect(calledOnChange).toBeTruthy();
  });
});
