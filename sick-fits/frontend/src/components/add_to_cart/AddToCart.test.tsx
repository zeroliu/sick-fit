import { MockedProvider } from '@apollo/react-testing';
import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { AddToCart } from './AddToCart';
import { createSuccessMocks, createFailureMocks } from './fixtures/default';
import { initStoryshots } from 'src/lib/test_utils';

initStoryshots();

describe('<AddToCart>', () => {
  it('triggers ADD_TO_CART mutation when clicked', async () => {
    const itemId = '1';
    const triggerAddToCart = jest.fn();
    const { getByTestId } = render(
      <MockedProvider
        mocks={createSuccessMocks(itemId, {
          addToCartMutationCallback: triggerAddToCart,
        })}>
        <AddToCart id={itemId} />
      </MockedProvider>,
    );
    getByTestId('button').click();
    await waitFor(() => expect(triggerAddToCart).toHaveBeenCalled());
  });

  it('refetches ME_QUERY', async () => {
    const itemId = '1';
    const triggerMeQuery = jest.fn();
    const { getByTestId } = render(
      <MockedProvider
        mocks={createSuccessMocks(itemId, {
          meQueryCallback: triggerMeQuery,
        })}>
        <AddToCart id={itemId} />
      </MockedProvider>,
    );
    getByTestId('button').click();
    await waitFor(() => expect(triggerMeQuery).toHaveBeenCalled());
  });

  it('alerts the error when failed', async () => {
    const itemId = '1';
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {
      // noop.
    });
    const { getByTestId } = render(
      <MockedProvider mocks={createFailureMocks(itemId)}>
        <AddToCart id={itemId} />
      </MockedProvider>,
    );
    getByTestId('button').click();
    await waitFor(() =>
      expect(alertSpy).toHaveBeenCalledWith('Network error: it failed'),
    );
  });
});
