import React, { useState } from 'react';
import Form from 'src/components/styles/Form';
import { useMutation } from '@apollo/react-hooks';
import {
  CREATE_ITEM,
  CreateItemVariable,
  CreateItemData,
} from 'src/queries/item';
import { ErrorMessage } from '../error_message/ErrorMessage';
import { useRouter } from 'next/router';

export const CreateItem: React.FC = () => {
  const router = useRouter();
  const [createItem, { loading, error }] = useMutation<
    CreateItemData,
    CreateItemVariable
  >(CREATE_ITEM);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
    largeImage: '',
  });
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type, name, value } = e.target;
    const actualValue = type === 'number' ? parseFloat(value) : value;
    setFormData({
      ...formData,
      [name]: actualValue,
    });
  };
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await createItem({ variables: { input: formData } });
    if (!data) {
      console.error('Mutation returns no data');
      return;
    }
    router.push({
      pathname: '/item',
      query: {
        id: data.createItem.id,
      },
    });
  };

  return (
    <Form onSubmit={submitForm}>
      <ErrorMessage error={error}></ErrorMessage>
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor='title'>
          Title
          <input
            type='text'
            name='title'
            placeholder='title'
            required
            value={formData.title}
            onChange={updateForm}></input>
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            name='price'
            placeholder='price'
            required
            value={formData.price}
            onChange={updateForm}></input>
        </label>
        <label htmlFor='description'>
          Description
          <input
            type='text'
            name='description'
            placeholder='description'
            required
            value={formData.description}
            onChange={updateForm}></input>
        </label>
        <button type='submit'>Submit</button>
      </fieldset>
    </Form>
  );
};
