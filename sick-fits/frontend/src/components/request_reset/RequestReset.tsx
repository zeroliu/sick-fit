import React, { useState } from 'react';

import { Form } from 'src/components/styles/Form';
import { ErrorMessage } from 'src/components/error_message/ErrorMessage';
import { useRequestResetMutation } from 'src/queries/password';

const defaultFormData = {
  email: '',
};

export const RequestReset: React.FC = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [requestReset, { loading, error, called }] = useRequestResetMutation({
    variables: { data: formData },
  });
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await requestReset();
    setFormData(defaultFormData);
  };

  return (
    <Form method='post' onSubmit={submitForm}>
      {error && <ErrorMessage error={error}></ErrorMessage>}
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Forget My Password</h2>
        {called && <p>Reset email sent!</p>}
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='email'
            value={formData.email}
            onChange={updateForm}></input>
        </label>
        <button type='submit'>Submit</button>
      </fieldset>
    </Form>
  );
};
