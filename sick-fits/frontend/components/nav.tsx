import Link from 'next/link';

export const Nav = () => (
  <div>
    <Link href='/'>
      <a>Home!</a>
    </Link>
    <Link href='/sell'>
      <a>Sell!</a>
    </Link>
  </div>
);
