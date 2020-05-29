import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import React from 'react';

import { Item } from './Item';
import { Item as ItemType } from 'src/queries/item';

const fakeItem: ItemType = {
  id: '1',
  title: 'fake item',
  description: 'this is a fake item',
  price: 1234,
  image: 'foo.jpg',
  largeImage: 'large_foo.jpg',
};

describe('<Item />', () => {
  it('matches the snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <Item data={fakeItem} />
      </MockedProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
