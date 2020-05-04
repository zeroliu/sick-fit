import { Items } from 'src/components/items/Items';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  return <Items currentPage={Number(router.query.page) || 1}></Items>;
}
