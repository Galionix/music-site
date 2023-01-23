import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss';
import { DefaultLayout } from '../src/components/Layout';
import Link from 'next/link';
import { MyHead } from '../src/components/MyHead';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <MyHead
        title='Playlist'
        description='your playlist'
        keywords='playlist, music, thedimas'
      />
      <DefaultLayout>
        {/* <Link href='/'>Main</Link>
      <Link href='/about'>About</Link> */}
      </DefaultLayout>
    </>
  );
}
