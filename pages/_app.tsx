import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import { playlist } from '../playlist';
import { Player } from '../src/components/Player';
import { useMusicStore } from '../src/music.store';

export default function App({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);

  const { setPlaylist, currentPlaylist } = useMusicStore();
  useEffect(() => {
    setShowChild(true);
    if (currentPlaylist.length === 0) {
      setPlaylist(playlist);
    }
  }, [currentPlaylist.length, setPlaylist]);

  if (!showChild) {
    return null;
  }

  if (typeof window === 'undefined') {
    return <></>;
  }

  return (
    <>
      <Component {...pageProps} />
      <Player />
    </>
  );
}
