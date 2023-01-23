import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.scss';
import { DefaultLayout } from '../src/components/Layout';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <DefaultLayout>
      {/* <Link href='/'>Main</Link>
      <Link href='/about'>About</Link> */}
    </DefaultLayout>
  );
}
