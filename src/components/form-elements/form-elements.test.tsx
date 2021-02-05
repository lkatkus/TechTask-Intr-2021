import React from 'react';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Form } from './form';

describe('Form', () => {
  it('render render form component', async () => {
    const { container, getByText } = render(
      <Form initialValues={{ first: 1 }} handleSubmit={() => null}>
        {() => <div>Form children</div>}
      </Form>,
    );

    expect(container.querySelector('form')).not.toBe(null);
    expect(getByText('Form children')).toBeDefined();
  });

  it('should submit the form', async () => {
    let wasSubmitted = false;

    const { getByText } = render(
      <Form
        initialValues={{ first: 1 }}
        handleSubmit={() => {
          wasSubmitted = true;
        }}
      >
        {() => (
          <div>
            <button type="submit">Submit</button>
          </div>
        )}
      </Form>,
    );

    await act(async () => await userEvent.click(getByText('Submit')));

    expect(wasSubmitted).toBe(true);
  });
});
