import React, { useState } from 'react';

import { Form } from 'src/components/styles/Form';
import { ErrorMessage } from 'src/components/error_message/ErrorMessage';
import { ME_QUERY } from 'src/queries/user';
import { useResetPasswordMutation } from 'src/queries/password';

interface Props {
  resetToken: string;
}

const defaultFormData = {
  password: '',
  confirmPassword: '',
};

export const ResetPassword: React.FC<Props> = ({ resetToken }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [resetPassword, { loading, error }] = useResetPasswordMutation({
    variables: { data: { ...formData, resetToken } },
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
    await resetPassword();
    setFormData(defaultFormData);
  };

  return (
    <Form method='post' onSubmit={submitForm}>
      {error && <ErrorMessage error={error}></ErrorMessage>}
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Reset Your Password</h2>
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='password'
            value={formData.password}
            onChange={updateForm}></input>
        </label>
        <label htmlFor='confirmPassword'>
          Confirm password
          <input
            type='password'
            name='confirmPassword'
            placeholder='confirmPassword'
            value={formData.confirmPassword}
            onChange={updateForm}></input>
        </label>
        <button type='submit'>Reset Password</button>
      </fieldset>
    </Form>
  );
};
