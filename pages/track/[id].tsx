import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { DefaultLayout } from '../../src/components/Layout';
import { getUrl } from '../../src/firebase/firebase-app';
import { useMusicStore } from '../../src/music.store';
import { getSongById } from '../../src/utils/file-utils';
import s from '@/styles/TrackPage.module.scss';
// import Slider from 'react-slick';
import { MyHead } from '../../src/components/MyHead';
import { playlist } from '../../playlist';
import { GetStaticPropsContext } from 'next';

// const settings = {
//   dots: false,
//   fade: true,
//   infinite: true,
//   autoplay: true,
//   speed: 3000,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   arrows: false,
// };
interface ITackPageProps {
  artwork: {
    src: string;
    description: string;
  }[];
}

export default function TrackPage({ artwork }: ITackPageProps) {
  const router = useRouter();
  const { currentSong, setSong, setCover } = useMusicStore();

  const [currentSlide, setCurrentSlide] = useState(0);

  const changeSlide = useCallback(
    (direction: number) => {
      // let value =
      if (currentSlide + direction < 0) {
        setCover(artwork[artwork.length - 1].src);
        setCurrentSlide(artwork.length - 1);
      } else if (currentSlide + direction >= artwork.length) {
        setCover(artwork[0].src);
        setCurrentSlide(0);
      } else {
        setCover(artwork[currentSlide + direction].src);
        setCurrentSlide(currentSlide + direction);
      }
    },
    [artwork.length, artwork, currentSlide, setCover],
  );

  useEffect(() => {
    setSong(getSongById(router.query.id as string));
  }, [router, router.query.id, setSong]);

  const [urls, setUrls] = useState<
    {
      src: string;
      description: string;
    }[]
  >(artwork);

  useEffect(() => {
    if (artwork.length < 1) return;
    const interval = setInterval(() => {
      changeSlide(1);
    }, 7000);

    return () => {
      clearInterval(interval);
    };
  }, [artwork.length, changeSlide, currentSong]); // w

  return (
    <>
      <MyHead
        title={'Track: ' + currentSong?.title}
        description='music groups'
        keywords='playlist, music, thedimas'
      />
      <DefaultLayout>
        {artwork.length > 0 && (
          <section className={s.art}>
            {urls.map((url, index) => (
              <figure
                className={index === currentSlide ? s.active : ''}
                key={url.src}
              >
                <img src={url.src} />
                {/* <img src={url.src} className={s.back} /> */}
                <figcaption>{url.description}</figcaption>
              </figure>
            ))}
          </section>
        )}
      </DefaultLayout>
    </>
  );
}

export async function getStaticPaths() {
  const res = {
    paths: playlist.map(song => ({ params: { id: `${song.id}` } })),
    fallback: true,
  };
  return res;
}

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>,
) {
  const { id } = context.params as { id: string };

  const song = getSongById(id);
  if (!song || !song?.artwork) {
    return {
      props: {
        artwork: [],
      },
    };
  }
  const artwork = [];

  for (const art of song.artwork) {
    const res = await getUrl('images/artworks/' + art.src);
    artwork.push({
      src: res,
      description: art.description,
    });
  }

  return {
    props: { artwork },
  };
}
