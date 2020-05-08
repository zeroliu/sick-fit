import React, { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { Item, useUpdateItemMutation } from 'src/queries/item';
import { Form } from 'src/components/styles/Form';
import { ErrorMessage } from '../error_message/ErrorMessage';

interface Props {
  data: Item;
}

export const UpdateItem: React.FC<Props> = ({ data }) => {
  const client = useApolloClient();
  const [formData, setFormData] = useState({
    title: data.title,
    description: data.description,
    price: data.price,
  });
  const [updateItem, { loading, error }] = useUpdateItemMutation({
    update: () => {
      client.resetStore();
    },
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
    const { data: updateItemData } = await updateItem({
      variables: { id: data.id, data: formData },
    });
    if (!updateItemData) {
      console.error('Mutation returns no data');
      return;
    }
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
        <button type='submit'>Save Changes</button>
      </fieldset>
    </Form>
  );
};
