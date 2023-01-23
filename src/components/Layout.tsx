import { ReactNode } from 'react';
import { Player } from './Player';
import { MemoizedPlaylist, Playlist } from './Playlist';
import s from './Layout.module.scss';
import { Menu } from './Menu';
import { Track } from '../../playlist';

export const DefaultLayout = ({
  children,
  playlistId,
  tracks,
}: {
  children: ReactNode;
  playlistId?: number;
  tracks?: Track[];
}) => {
  return (
    <main className={s.main}>
      <Menu />
      <Playlist playlistId={playlistId} tracks={tracks} />
      <section className={s.content}>{children}</section>
      {/* <Player /> */}
    </main>
  );
};

export const AboutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={s.main}>
      <Menu />
      <section className={`${s.content} ${s.expanded}`}>{children}</section>
      {/* <Player /> */}
    </main>
  );
};
