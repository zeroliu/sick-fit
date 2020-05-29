import { render } from '@testing-library/react';
import React from 'react';

import { CartCount } from './CartCount';

describe('<CartCount />', () => {
  it('matches the snapshot', () => {
    const { container } = render(<CartCount count={10} />);
    expect(container).toMatchSnapshot();
  });
});
