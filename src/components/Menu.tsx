import s from './Menu.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const Menu = () => {
  const router = useRouter();
  console.log('router: ', router);

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
