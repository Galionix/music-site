import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.scss';
import { AboutLayout, DefaultLayout } from '../src/components/Layout';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function About() {
  return (
    <AboutLayout>
      <Link href='/'>Main</Link>
      <Link href='/about'>About</Link>
    </AboutLayout>
  );
}
