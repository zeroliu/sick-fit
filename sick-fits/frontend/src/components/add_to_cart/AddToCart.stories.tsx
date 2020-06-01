import { MockedProvider } from '@apollo/react-testing';
import React from 'react';

import { AddToCart } from './AddToCart';

export default {
  title: '<AddToCart>',
  decorators: [
    (storyFn: () => JSX.Element) => (
      <MockedProvider>{storyFn()}</MockedProvider>
    ),
  ],
};
export const base = () => <AddToCart id='1' />;
