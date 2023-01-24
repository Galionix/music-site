import { create } from 'zustand';
import { Album, albums, Track } from '../playlist';
import { persist } from 'zustand/middleware';

interface MusicStore {
  loopMode: 'none' | 'playlist' | 'song';
  setLoopMode: (loopMode: 'none' | 'playlist' | 'song') => void;
  currentSong: Track | undefined;
  setSong: (song: Track | undefined) => void;
  setPlaylist: (playlist: Track[]) => void;
  currentPlaylist: Track[];
  album: Album | undefined;
  setAlbum: (album: Album | undefined) => void;
  volume: number;
  setVolume: (volume: number) => void;
  cover: string;
  setCover: (cover: string) => void;
}

export const useMusicStore = create<MusicStore>()(
  persist(
    set => ({
      cover: '',
      setCover: (cover: string) => {
        set(state => ({ cover }));
      },
      album: albums[0],
      setAlbum: (album: Album | undefined) => {
        set(state => ({ album }));
      },
      loopMode: 'none',
      setLoopMode: (loopMode: 'none' | 'playlist' | 'song') => {
        set(state => ({ loopMode }));
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
