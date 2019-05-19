import { Nav } from 'components/nav';
import { Logo, StyledHeader } from './styles';
import Link from 'next/link';

export const Header = () => (
  <StyledHeader>
    <div className='bar'>
      <Logo>
        <Link href='/'>
          <a>Sick Fit</a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className='sub-bar'>
      <p>Search</p>
    </div>
    <div>Cart</div>
  </StyledHeader>
);
