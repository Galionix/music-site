import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/About.module.scss';
import { AboutLayout, DefaultLayout } from '../src/components/Layout';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export default function About() {
  return (
    <AboutLayout>
      <section className={styles.about}>
        <h1>About</h1>
        <p>
          Hello! The purpose of this project is to provide easier way to share
          my tracks with people. Hope you like them!
        </p>
      </section>
    </AboutLayout>
  );
}
