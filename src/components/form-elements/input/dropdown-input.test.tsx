import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import DropdownInput from './dropdown-input';

describe('DropdownInput', () => {
  it('renders dropdown with provided params', () => {
    const { getByTestId, getByText } = render(
      <DropdownInput
        name="dropdown-name"
        label="dropdown-label"
        value={1}
        onChange={() => null}
        options={[
          { value: 1, label: 'label-1' },
          { value: 2, label: 'label-2' },
          { value: 3, label: 'label-3' },
        ]}
      />,
    );

    expect(getByTestId('dropdown-name-data-testid')).toBeInTheDocument();
    expect(getByTestId('dropdown-name-options-1')).toBeInTheDocument();
    expect(getByTestId('dropdown-name-options-2')).toBeInTheDocument();
    expect(getByTestId('dropdown-name-options-3')).toBeInTheDocument();
    expect(getByText('dropdown-label')).toBeInTheDocument();
  });

  it('uses the provided onChange, when value is being changed', () => {
    let calledOnChange = false;

    const { getByTestId } = render(
      <DropdownInput
        name="dropdown-name"
        label="dropdown-label"
        value={1}
        options={[
          { value: 1, label: 'label-1' },
          { value: 2, label: 'label-2' },
          { value: 3, label: 'label-3' },
        ]}
        onChange={() => {
          calledOnChange = true;
        }}
      />,
    );

    fireEvent.change(getByTestId('dropdown-name-data-testid'), { target: { value: 'someValue' } });

    expect(calledOnChange).toBeTruthy();
  });
});
