import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import { AboutLayout, DefaultLayout } from '../../src/components/Layout';
import Link from 'next/link';
import { albums } from '../../playlist';
import { getUrl } from '../../src/firebase/firebase-app';
import { useEffect, useState } from 'react';
import styles from '@/styles/collections.module.scss';

interface Props {
  urls: {
    id: number;
    url: string;
  }[];
}
export const getStaticProps = async () => {
  const urls = await Promise.all(
    albums.map(async album => {
      return {
        id: album.id,
        url: await getUrl(album.cover, url => {
          return url;
        }),
      };
    }),
  );

  return {
    props: {
      urls,
    },
  };
};
export default function Collections({ urls }: Props) {
  //   console.log('urls: ', urls);
  //   const [imageUrls, setImageUrls] = useState<
  //     {
  //       id: number;
  //       url: string;
  //     }[]
  //   >([]);

  // useEffect(() => {
  //     // get image urls
  //     const urls = albums.map(async album => {
  //         return await getUrl(album.cover);
  //     });

  // }, []);

  return (
    <AboutLayout>
      <ul className={styles.collections}>
        {albums.map(album => {
          //   getUrl(album.cover, url => {
          //     setImageUrls([...imageUrls, { id: album.id, url }]);
          //   });

          //   console.log('imageUrls: ', imageUrls);
          return (
            <li key={album.id}>
              <Link href={`/collections/${album.id}`}>
                {/* <a> */}
                <h3>{album.title}</h3>
                <Image
                  src={`${
                    urls.find(item => {
                      return item.id === album.id;
                    })?.url
                  }`}
                  alt={album.title}
                  width={50}
                  height={50}
                />
                {/* </a> */}
              </Link>
            </li>
          );
        })}
      </ul>
    </AboutLayout>
  );
}
