import React, { useState } from 'react';

import { ErrorMessage } from 'src/components/error_message/ErrorMessage';
import { Form } from 'src/components/styles/Form';
import { useRegisterMutation, ME_QUERY } from 'src/queries/user';

const defaultFormData = {
  email: '',
  name: '',
  password: '',
};

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [register, { loading, error }] = useRegisterMutation({
    variables: { data: formData },
    refetchQueries: [{ query: ME_QUERY }],
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
    await register();
    setFormData(defaultFormData);
  };

  return (
    <Form method='post' onSubmit={submitForm}>
      {error && <ErrorMessage error={error} />}
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Sign Up for An Account</h2>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='email'
            value={formData.email}
            onChange={updateForm} />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            placeholder='name'
            value={formData.name}
            onChange={updateForm} />
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='password'
            value={formData.password}
            onChange={updateForm} />
        </label>
        <button type='submit'>Sign Up</button>
      </fieldset>
    </Form>
  );
};
