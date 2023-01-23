import s from './Menu.module.scss';
import Link from 'next/link';

export const Menu = () => {
  return (
    <section className={s.menu}>
      <ul>
        <li>
          <Link href='/'>Playlist</Link>
        </li>
        <li>
          <Link href='/collections'>Collections</Link>
        </li>
        <li>
          <Link href='/about'>About</Link>
        </li>
        <li>
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
