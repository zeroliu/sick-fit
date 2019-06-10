import React, { Component } from 'react';
import Form from 'components/styles/form';
import { ALL_ITEMS_QUERY_items } from 'components/items/types/ALL_ITEMS_QUERY';
import { Omit } from 'types/utils';

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
  render() {
    return (
      <Form>
        <fieldset>
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
        </fieldset>
      </Form>
    );
  }
}
