import React, { Component } from 'react';
import Form from 'components/styles/form';
import { Omit } from 'types/utils';
import { Mutation, Query } from 'react-apollo';
import { updateItemMutation, singleItemQuery } from './gql';
import { ErrorMessage } from 'components/error_message';
import {
  UPDATE_ITEM_MUTATIONVariables,
  UPDATE_ITEM_MUTATION_updateItem,
} from './types/UPDATE_ITEM_MUTATION';
import {
  SINGLE_ITEM_QUERY,
  SINGLE_ITEM_QUERYVariables,
} from './types/SINGLE_ITEM_QUERY';

interface Props {
  id?: string;
}
type State = Omit<UPDATE_ITEM_MUTATIONVariables, 'id'>;

export class UpdateItem extends Component<Props, State> {
  state: State = {};
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
    if (!this.props.id) {
      return <ErrorMessage error={new Error('id is empty')} />;
    }

    return (
      <Query<SINGLE_ITEM_QUERY, SINGLE_ITEM_QUERYVariables>
        query={singleItemQuery}
        variables={{ id: this.props.id }}
      >
        {({ data, loading }) => {
          if (loading) {
            return <p>loading...</p>;
          }
          if (!data || !data.item) {
            return <p>Item not exists for ID: {this.props.id}</p>;
          }
          return (
            <Mutation<
              UPDATE_ITEM_MUTATION_updateItem,
              UPDATE_ITEM_MUTATIONVariables
            >
              mutation={updateItemMutation}
              variables={{
                ...this.state,
                id: this.props.id!,
              }}
            >
              {(updateItem, { loading, error }) => (
                <Form
                  onSubmit={async (e: React.FormEvent) => {
                    e.preventDefault();
                    const res = await updateItem();
                    if (!res || !res.data) {
                      throw new Error('No item response is returned.');
                    }
                  }}
                >
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor='title'>
                      Title
                      <input
                        type='text'
                        id='title'
                        name='title'
                        placeholder='Title'
                        required
                        onChange={this.handleChange}
                        defaultValue={data!.item!.title}
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
                        defaultValue={data!.item!.price.toString()}
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
                        defaultValue={data!.item!.description}
                      />
                    </label>
                    <button type='submit'>Submit</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
