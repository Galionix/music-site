import { create } from 'zustand';
import { Album, albums, Track } from '../playlist';
import { persist } from 'zustand/middleware';

interface MusicStore {
  loopPlaylist: boolean;
  setLoopPlaylist: (loopPlaylist: boolean) => void;
  currentSong: Track | undefined;
  setSong: (song: Track | undefined) => void;
  setPlaylist: (playlist: Track[]) => void;
  currentPlaylist: Track[];
  album: Album | undefined;
  setAlbum: (album: Album | undefined) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const useMusicStore = create<MusicStore>()(
  persist(
    set => ({
      album: albums[0],
      setAlbum: (album: Album | undefined) => {
        set(state => ({ album }));
      },
      loopPlaylist: false,
      setLoopPlaylist: (loopPlaylist: boolean) => {
        set(state => ({ loopPlaylist }));
      },
      volume: 0.5,
      setVolume: (volume: number) => {
        set(state => ({ volume }));
      },
      //   duration: 0,
      //   setDuration: (duration: number) => {
      //     set(state => ({ duration }));
      //   },
      currentSong: undefined,
      setSong: (currentSong: Track | undefined) => {
        set(state => ({ currentSong }));
      },
      currentPlaylist: [],
      setPlaylist: (currentPlaylist: Track[]) => {
        set(state => ({ currentPlaylist }));
      },
    }),
    {
      name: 'music-store', // unique name
    },
  ),
);
