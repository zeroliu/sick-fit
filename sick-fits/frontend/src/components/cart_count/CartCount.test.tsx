import { shallow } from 'enzyme';
import React from 'react';

import { CartCount } from './CartCount';

describe('<CartCount />', () => {
  it('matches the snapshot', () => {
    const wrapper = shallow(<CartCount count={10} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('updates via props', () => {
    const wrapper = shallow(<CartCount count={10} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 20 });
    expect(wrapper).toMatchSnapshot();
  });
});
