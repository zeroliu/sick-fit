import { useApolloClient } from '@apollo/react-hooks';
import { QueryOptions, ApolloQueryResult } from 'apollo-boost';
import gql from 'graphql-tag';
import { useState, useCallback } from 'react';

import { Item } from 'src/generated/graphql';

const SEARCH_ITEMS_QUERY = gql`
  query($searchTerm: String!) {
    items(searchTerm: $searchTerm) {
      id
      title
      image
    }
  }
`;
export type SearchItem = Pick<Item, 'id' | 'title' | 'image'>;
interface SearchItemsQueryData {
  items: SearchItem[];
}
interface SearchItemsQueryArgs {
  searchTerm: string;
}
type SearchItemsQueryOptions = QueryOptions<SearchItemsQueryArgs>;
export function useSearchItemsQueryBuilder(
  options?: SearchItemsQueryOptions,
): [
  (
    options?: Partial<SearchItemsQueryOptions>,
  ) => Promise<ApolloQueryResult<SearchItemsQueryData>>,
  { loading: boolean },
] {
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const triggerQuery = useCallback(
    async (overriddenOptions?: Partial<SearchItemsQueryOptions>) => {
      setLoading(true);
      const result = await client.query<
        SearchItemsQueryData,
        SearchItemsQueryArgs
      >({ query: SEARCH_ITEMS_QUERY, ...options, ...overriddenOptions });
      setLoading(false);
      return result;
    },
    [client, options],
  );
  return [triggerQuery, { loading }];
}
