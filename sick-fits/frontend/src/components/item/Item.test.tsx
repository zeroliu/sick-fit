import { shallow } from 'enzyme';
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
    const wrapper = shallow(<Item data={fakeItem} />);
    expect(wrapper).toMatchSnapshot();
  });
});
