import { MockedProvider } from '@apollo/react-testing';
import { render } from '@testing-library/react';
import React from 'react';

import { AddToCart } from './AddToCart';

describe('<AddToCart />', () => {
  it('renders correctly', () => {
    const { container } = render(
      <MockedProvider>
        <AddToCart id='1' />
      </MockedProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
