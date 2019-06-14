import { UpdateItem } from 'components/update_item';

interface Props {
  query: { id?: string };
}

const Update = ({ query }: Props) => (
  <div>
    <UpdateItem id={query.id} />
  </div>
);

export default Update;
