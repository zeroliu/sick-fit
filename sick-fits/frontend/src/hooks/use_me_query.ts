import { useQuery } from '@apollo/react-hooks';
import { ME_QUERY, MeQueryData } from 'src/queries/user';

export function useMeQuery() {
  return useQuery<MeQueryData>(ME_QUERY);
}
