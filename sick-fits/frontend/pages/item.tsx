import { SingleItem } from 'src/components/single_item/SingleItem';
import { useQuery } from '@apollo/react-hooks';
import { ItemQueryData, ITEM_QUERY } from 'src/queries/item';
import { QueryItemArgs } from 'src/generated/graphql';
import { useRouter } from 'next/router';
import { ErrorMessage } from 'src/components/error_message/ErrorMessage';

export default function Item() {
  const router = useRouter();
  const { loading, error, data } = useQuery<ItemQueryData, QueryItemArgs>(
    ITEM_QUERY,
    {
      variables: { id: router.query.id as string },
    },
  );
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <ErrorMessage error={error}></ErrorMessage>;
  }
  if (!data?.item) {
    return <p>Item not found for id {router.query.id}</p>;
  }
  return <SingleItem data={data.item}></SingleItem>;
}
