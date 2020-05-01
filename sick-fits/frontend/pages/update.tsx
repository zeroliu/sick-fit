import { UpdateItem } from 'src/components/update_item/UpdateItem';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import { ITEM_QUERY, ItemQueryData } from 'src/queries/item';
import { QueryItemArgs } from 'src/generated/graphql';

export default function Update() {
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
    return <p>Error: {error.message}</p>;
  }
  if (!data) {
    return <p>Error: data not found</p>;
  }

  return <UpdateItem data={data.item}></UpdateItem>;
}
