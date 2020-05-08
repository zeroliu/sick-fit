import React, { useState } from 'react';
import { Form } from 'src/components/styles/Form';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { CREATE_ITEM_MUTATION, CreateItemMutationData } from 'src/queries/item';
import { ErrorMessage } from '../error_message/ErrorMessage';
import { useRouter } from 'next/router';
import { MutationCreateItemArgs } from 'src/generated/graphql';

export const CreateItem: React.FC = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [createItem, { loading, error }] = useMutation<
    CreateItemMutationData,
    MutationCreateItemArgs
  >(CREATE_ITEM_MUTATION, {
    update: () => {
      client.resetStore();
    },
  });
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

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files) {
      return;
    }

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/zeroliu/image/upload',
      {
        method: 'POST',
        body: data,
      },
    );
    const file = await res.json();
    setFormData({
      ...formData,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await createItem({ variables: { data: formData } });
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
          Image
          <input
            type='file'
            name='file'
            placeholder='file'
            onChange={uploadFile}></input>
          {formData.image && (
            <img width='200px' src={formData.image} alt='Upload preview'></img>
          )}
        </label>
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
