import { uploadImage } from 'services/image_service';
import React, { Component } from 'react';
import Form from 'components/styles/form';
import { ALL_ITEMS_QUERY_items } from 'components/items/types/ALL_ITEMS_QUERY';
import { Omit } from 'types/utils';
import { Mutation } from 'react-apollo';
import { createItemMutation } from './gql';
import { ErrorMessage } from 'components/error_message';
import Router from 'next/router';
import {
  CREATE_ITEM_MUTATIONVariables,
  CREATE_ITEM_MUTATION,
} from './types/CREATE_ITEM_MUTATION';

type State = Omit<ALL_ITEMS_QUERY_items, 'id' | '__typename'>;

export class CreateItem extends Component<{}, State> {
  state = {
    title: '',
    description: '',
    price: 0,
    image: '',
    largeImage: '',
  };
  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    } as State);
  };
  uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    const response = await uploadImage(files[0]);
    if (!response) {
      return;
    }
    this.setState({
      image: response.image,
      largeImage: response.largeImage,
    });
  };
  render() {
    return (
      <Mutation<CREATE_ITEM_MUTATION, CREATE_ITEM_MUTATIONVariables>
        mutation={createItemMutation}
        variables={this.state}
      >
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async (e: React.FormEvent) => {
              e.preventDefault();
              const res = await createItem();
              if (res && res.data) {
                Router.push({
                  pathname: '/item',
                  query: { id: res.data.createItem.id },
                });
              } else {
                throw new Error('No item response is returned.');
              }
            }}
          >
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor='file'>
                Image
                <input
                  type='file'
                  id='file'
                  name='file'
                  placeholder='Upload an image'
                  required
                  onChange={this.uploadImage}
                />
              </label>
              {this.state.image && (
                <img src={this.state.image} alt='upload preview' />
              )}
              <label htmlFor='title'>
                Title
                <input
                  type='text'
                  id='title'
                  name='title'
                  placeholder='Title'
                  required
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </label>
              <label htmlFor='price'>
                Price
                <input
                  type='number'
                  id='price'
                  name='price'
                  placeholder='Price'
                  required
                  onChange={this.handleChange}
                  value={this.state.price}
                />
              </label>
              <label htmlFor='description'>
                Description
                <textarea
                  id='description'
                  name='description'
                  placeholder='Description'
                  required
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </label>
              <button type='submit'>Save Changes</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
