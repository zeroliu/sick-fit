import React, { Component } from 'react';
import { allItemsQuery } from './query';
import { ALL_ITEMS_QUERY } from './types/ALL_ITEMS_QUERY';
import { Query } from 'react-apollo';
import { Center, ItemsList } from './styles';
import { Item } from 'components/item';

export class Items extends Component {
  render() {
    return (
      <Center>
        <Query<ALL_ITEMS_QUERY> query={allItemsQuery}>
          {({ data, loading, error }) => {
            if (loading) return <div>Loading...</div>;
            if (error) return <div>{error.message}</div>;
            if (!data) return <div>No items found</div>;

            return (
              <ItemsList>
                {data.items.map(item => (
                  <Item item={item} key={item.id} />
                ))}
              </ItemsList>
            );
          }}
        </Query>
      </Center>
    );
  }
}
