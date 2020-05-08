import React, { useState } from 'react';
import { Form } from '../styles/Form';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_MUTATION, RegisterMutationData } from 'src/queries/user';
import { MutationRegisterArgs } from 'src/generated/graphql';
import { ErrorMessage } from '../error_message/ErrorMessage';

const defaultFormData = {
  email: '',
  name: '',
  password: '',
};

export const SignUp: React.FC = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [register, { loading, error }] = useMutation<
    RegisterMutationData,
    MutationRegisterArgs
  >(REGISTER_MUTATION, {
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
    await register();
    setFormData(defaultFormData);
  };

  return (
    <Form method='post' onSubmit={submitForm}>
      {error && <ErrorMessage error={error}></ErrorMessage>}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='email'
            value={formData.email}
            onChange={updateForm}></input>
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            name='name'
            placeholder='name'
            value={formData.name}
            onChange={updateForm}></input>
        </label>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='password'
            value={formData.password}
            onChange={updateForm}></input>
        </label>
        <button type='submit'>Sign Up</button>
      </fieldset>
    </Form>
  );
};
