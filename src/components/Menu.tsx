import s from './Menu.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Spin as Hamburger } from 'hamburger-react';

export const Menu = () => {
  const router = useRouter();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  if (isTabletOrMobile) {
    return <BurgerMenu />;
  }
  const isActive = (path: string) => {
    return router.pathname === path;
  };
  return (
    <section className={s.menu}>
      <ul>
        <li className={isActive('/') ? s.active : ''}>
          <Link href='/'>Playlist</Link>
        </li>
        <li className={isActive('/collections') ? s.active : ''}>
          <Link href='/collections'>Collections</Link>
        </li>
        <li className={isActive('/about') ? s.active : ''}>
          <Link href='/about'>About</Link>
        </li>
        <li
        // clas
        >
          <a
            href='https://thedimas.com'
            rel='noopener noreferrer'
            target='_blank'
          >
            Main site
          </a>
        </li>
      </ul>
    </section>
  );
};

function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const isActive = (path: string) => {
    return router.pathname === path;
  };
  return (
    <div className={`${s.burgerMenu} ${open ? s.open : s.closed}`}>
      <Hamburger toggled={open} toggle={setOpen} />
      {/* <div className={s.burger} onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div> */}
      {/* <div> */}
      <ul>
        <li className={isActive('/') ? s.active : ''}>
          <Link href='/'>Playlist</Link>
        </li>
        <li className={isActive('/collections') ? s.active : ''}>
          <Link href='/collections'>Collections</Link>
        </li>
        <li className={isActive('/about') ? s.active : ''}>
          <Link href='/about'>About</Link>
        </li>
        <li
        // clas
        >
          <a
            href='https://thedimas.com'
            rel='noopener noreferrer'
            target='_blank'
          >
            Main site
          </a>
        </li>
      </ul>
    </div>
    // </div>
  );
}