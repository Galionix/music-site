import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DefaultLayout } from '../../src/components/Layout';
import { getUrl } from '../../src/firebase/firebase-app';
import { useMusicStore } from '../../src/music.store';
import { getSongById } from '../../src/utils/file-utils';
import s from '@/styles/TrackPage.module.scss';
import Slider from 'react-slick';
import { MyHead } from '../../src/components/MyHead';

const settings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function TrackPage() {
  const router = useRouter();
  const { currentSong, setSong } = useMusicStore();

  useEffect(() => {
    // console.log('router: ', router);
    setSong(getSongById(router.query.id as string));
  }, [router, router.query.id, setSong]);

  const [urls, setUrls] = useState<
    {
      src: string;
      description: string;
    }[]
  >([]);

  // useEffect(() => {
  //   if (!currentSong || !currentSong.artwork) {
  //     setUrls([]);
  //     return;
  //   }

  //   currentSong.artwork.forEach(art => {
  //     getUrl('images/artworks/' + art.src, url => {
  //       setUrls([
  //         ...urls,
  //         {
  //           src: url,
  //           description: art.description,
  //         },
  //       ]);
  //     });
  //   });
  // }, [currentSong, currentSong?.id, urls]);

  // const [art, setArt] = useState<{
  //   src: string;
  //   description: string;
  // } | null>({ src: '', description: '' });

  // useEffect(() => {
  //   if (!currentSong || !currentSong.artwork) {
  //     setArt(null);
  //     return;
  //   }

  //   setArt(currentSong.artwork[0]);

  //   // console.log('src', 'images/artworks/' + currentSong.artwork[0].src);
  //   // getUrl('images/artworks/' + currentSong.artwork[0].src, url => setUrls([
  //   //   ...urlsm
  //   // ]));
  // }, [currentSong, art]);

  // console.log('urls: ', urls);
  return (
    <>
      <MyHead
        title={'Track: ' + currentSong?.title}
        description='music groups'
        keywords='playlist, music, thedimas'
      />
      <DefaultLayout>
        {urls.length > 0 && (
          <section className={s.art}>
            {/* <p>{art.description}</p> */}
            <Slider {...settings}>
              {urls.map((url, index) => (
                <figure key={url.src}>
                  <img src={url.src} />
                  <figcaption>{url.description}</figcaption>
                </figure>
              ))}
              {/* <figure>
              <img src={url} />
              <figcaption>{art.description}</figcaption>
            </figure> */}
            </Slider>
            {/* <Image
            src={
              url
              // currentSong?.artwork && currentSong?.artwork.length > 0
              //   ? currentSong?.artwork[0]
            }
            alt='Picture of the author'
            // layout='responsive'
            fill
            // width={500}
            // height={500}
          /> */}
          </section>
        )}
        {/* <Link href='/'>Main</Link>
      <Link href='/about'>About</Link> */}
      </DefaultLayout>
    </>
  );
}
