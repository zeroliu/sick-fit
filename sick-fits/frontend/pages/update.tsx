import { UpdateItem } from 'components/update_item';

interface Props {
  query: { id?: string };
}

const Update = ({ query }: Props) => {
  if (!query.id) {
    return <div>No id is provided</div>;
  }
  return (
    <div>
      <UpdateItem id={query.id!} />
    </div>
  );
};

export default Update;
