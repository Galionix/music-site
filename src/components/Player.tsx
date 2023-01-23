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
  // const [volume, setVolume] = useState<number>(0.5);
  const nextTrack = useNextTrack();
  const previousTrack = usePreviousTrack();
  // console.log('nextTrack: ', nextTrack);
  // const setNextTrack =
  const [url, setUrl] = useState<string | undefined>(undefined);
  let ref: ReactAudioPlayer | null = null;

  useEffect(() => {
    if (currentSong) {
      getUrl('sound/' + currentSong.file, setUrl);
    }
  }, [currentSong]);
  // console.log('-----------');

  // console.log(currentSong?.id);
  // console.log(formatDuration(duration));
  //   if (playerState === 'paused') {
  //     ref?.audioEl.current?.play();
  //   }
  // }, [playerState, ref?.audioEl]);

  function onMetadataLoaded(e: any) {
    ref?.audioEl.current?.play();
    setDuration(e.target.duration);
    // console.log('-----------');
    // console.log(currentSong?.id);
    console.log('duration: ', e.target.duration);

    // console.log(formatDuration(duration));
    // console.log(e.target.duration);
  }

  const onClickNext = () => {
    setSong(nextTrack);
    router.push('/track/' + nextTrack?.id);
  };

  const onClickPrevious = () => {
    setSong(previousTrack);
    router.push('/track/' + previousTrack?.id);
  };
  //   const ref = useRef<HTMLAudioElement>(null);

  // const PlayButton = () => {};

  return (
    <menu className={s.player}>
      <span className={s.text + ' ' + s.time}>
        {formatDuration(currentTime)} / {formatDuration(duration)}
      </span>
      {/* <button onClick={() => ref?.audioEl.current?.pause()}>Pause</button> */}

      <section className={s.controlGroup}>
        <button className={s.styled}></button>
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
        <button></button>
      </section>

      {/* <span>
        {currentSong?.artist} - {currentSong?.title}
      </span> */}
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
          //   ref.listenTracker = parseInt(e.target.value);
        }}
      />
      <ReactAudioPlayer
        preload='auto'
        src={url}
        ref={ref2 => {
          ref = ref2;
        }}
        //   listenTracker={currentTime}
        autoPlay
        //   setListenTrack={() => {

        //       console.log('setListenTrack')
        //   }}
        // controls
        listenInterval={1000}
        onLoadedMetadata={onMetadataLoaded}
        onListen={e => {
          setCurrentTime(e);
          setPlayerState('playing');
        }}
        onEnded={() => {
          console.log('ended', { nextTrack });
          setPlayerState('paused');
          setSong(nextTrack);
          router.push('/track/' + nextTrack?.id);
        }}
        volume={volume}
      />
    </menu>
  );
};
