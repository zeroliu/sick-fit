import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import casual from 'casual';
import React from 'react';

import { Items } from './Items';
import { actAfterRender } from 'src/lib/test_utils';
import { ALL_ITEMS_QUERY, ITEMS_CONNECTION_QUERY } from 'src/queries/item';

casual.seed(123);

const mocks: MockedResponse[] = [
  {
    request: {
      query: ITEMS_CONNECTION_QUERY,
    },
    result: {
      data: {
        itemsConnection: {
          __typename: 'ItemsConnection',
          totalCount: 5,
        },
      },
    },
  },
  {
    request: {
      query: ALL_ITEMS_QUERY,
      variables: { take: 4, skip: 0 },
    },
    result: {
      data: {
        items: [
          {
            __typename: 'Item',
            id: '123',
            title: casual.title,
            price: 123,
            description: casual.sentence,
            image: 'foo.jpg',
            largeImage: 'large_foo.jpg',
          },
          {
            __typename: 'Item',
            id: '456',
            title: casual.title,
            price: 456,
            description: casual.sentence,
            image: 'foo.jpg',
            largeImage: 'large_foo.jpg',
          },
        ],
      },
    },
  },
];

describe('<Items />', () => {
  it('renders loading state correctly', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <Items currentPage={1} />
      </MockedProvider>,
    );
    expect(container).toMatchSnapshot();
    await actAfterRender();
  });

  it('renders final state correctly', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <Items currentPage={1} />
      </MockedProvider>,
    );
    await actAfterRender();
    expect(container).toMatchSnapshot();
  });
});
