import gql from 'graphql-tag';
import { Item } from 'src/generated/graphql';
import { QueryOptions, ApolloQueryResult } from 'apollo-boost';
import { useApolloClient } from '@apollo/react-hooks';
import { useState } from 'react';

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
  return [
    async (overriddenOptions) => {
      setLoading(true);
      const result = await client.query<
        SearchItemsQueryData,
        SearchItemsQueryArgs
      >({ query: SEARCH_ITEMS_QUERY, ...options, ...overriddenOptions });
      setLoading(false);
      return result;
    },
    { loading },
  ];
}
