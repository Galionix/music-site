import { useEffect, useRef, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { getUrl } from '../firebase/firebase-app';
import { useMusicStore } from '../music.store';
import {
  formatDuration,
  useNextTrack,
  usePreviousTrack,
} from '../utils/file-utils';
import s from './Player.module.scss';
import { FaPlay, FaPause } from 'react-icons/fa';
import { TbPlayerTrackPrev, TbPlayerTrackNext } from 'react-icons/tb';
import { useRouter } from 'next/router';
export const Player = () => {
  const router = useRouter();
  const [playerState, setPlayerState] = useState<'playing' | 'paused'>(
    'paused',
  );

  const { currentSong, volume, setVolume, setSong } = useMusicStore();
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const nextTrack = useNextTrack();
  const previousTrack = usePreviousTrack();
  const [url, setUrl] = useState<string | undefined>(undefined);
  let ref: ReactAudioPlayer | null = null;

  useEffect(() => {
    if (currentSong) {
      getUrl('sound/' + currentSong.file, setUrl);
    }
  }, [currentSong]);

  function onMetadataLoaded(e: any) {
    ref?.audioEl.current?.play();
    setDuration(e.target.duration);
  }

  const onClickNext = () => {
    setSong(nextTrack);
    router.push('/track/' + nextTrack?.id);
  };

  const onClickPrevious = () => {
    setSong(previousTrack);
    router.push('/track/' + previousTrack?.id);
  };

  return (
    <menu className={s.player}>
      <span className={s.text + ' ' + s.time}>
        {formatDuration(currentTime)} / {formatDuration(duration)}
      </span>

      <section className={s.controlGroup}>
        {/* <button className={s.styled}></button> */}
        <button disabled={!previousTrack} onClick={onClickPrevious}>
          <TbPlayerTrackPrev />
        </button>
        <button
          className={s.pp}
          onClick={() => {
            if (playerState === 'paused') {
              setPlayerState('playing');
              ref?.audioEl.current?.play();
            }
            if (playerState === 'playing') {
              setPlayerState('paused');
              ref?.audioEl.current?.pause();
            }
          }}
        >
          {playerState === 'paused' ? <FaPlay /> : <FaPause />}
        </button>
        <button onClick={onClickNext} disabled={!nextTrack}>
          <TbPlayerTrackNext />
        </button>
        {/* <button></button> */}
      </section>

      <input
        type={'range'}
        min={0}
        max={1}
        step={0.01}
        className={s.volume}
        value={volume}
        onChange={e => setVolume(parseFloat(e.target.value))}
      />
      <input
        className={s.track}
        type={'range'}
        min={0}
        max={duration}
        step={1}
        value={currentTime}
        onChange={e => {
          setCurrentTime(parseInt(e.target.value));
          if (!ref?.audioEl.current) return;
          ref.audioEl.current.currentTime = parseInt(e.target.value);
        }}
      />
      <ReactAudioPlayer
        preload='auto'
        src={url}
        ref={ref2 => {
          ref = ref2;
        }}
        autoPlay
        listenInterval={1000}
        onLoadedMetadata={onMetadataLoaded}
        onListen={e => {
          setCurrentTime(e);
          setPlayerState('playing');
        }}
        onEnded={() => {
          setPlayerState('paused');
          setSong(nextTrack);
          router.push('/track/' + nextTrack?.id);
        }}
        volume={volume}
      />
    </menu>
  );
};
