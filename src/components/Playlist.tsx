import Link from 'next/link';
import { albums, playlist, Track } from '../../playlist';
import { useMusicStore } from '../music.store';
import { formatDuration, getPlaylistByAlbumId } from '../utils/file-utils';
import s from './Playlist.module.scss';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useRef, useEffect, memo } from 'react';
export const Playlist = ({
  playlistId,
  tracks,
}: {
  playlistId?: number;
  tracks?: Track[];
}) => {
  const childRef = useRef<HTMLLIElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);
  const { setSong, currentSong, currentPlaylist, setPlaylist } =
    useMusicStore();

  const displayPlaylist = tracks ?? currentPlaylist;
  const key = tracks ? 'tracks' : 'playlist';

  const executeScroll = () => {
    if (!childRef?.current && !childRef?.current?.offsetTop) return;
    const topPos = childRef?.current?.offsetTop;

    containerRef?.current?.scrollTo({
      top: topPos,
      behavior: 'smooth',
    });

    // myRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    // if (currentSong) {
    executeScroll();
    // }
  }, []);

  return (
    <section className={s.playlist}>
      <ul ref={containerRef}>
        {[...displayPlaylist].map((song, index) => (
          <li
            ref={currentSong?.id === song.id ? childRef : null}
            className={`${s.playlistItem} ${
              currentSong?.id === song.id ? s['current-track'] : ''
            }`}
            key={`${song.id} ${index} ${key}`}
            // onClick={() => {
            //   if (playlistId !== undefined) {
            //     setPlaylist(
            //       getPlaylistByAlbumId(playlistId),
            //       // albums.find((album) => album.id === playlistId)?.tracks
            //     );
            //   }
            //   // setPlaylist(albums
            //   //   .find((album) => album.id === playlistId)?.tracks);
            //   setSong(song);
            // }}
          >
            <BadgesSection song={song} />
            <Link key={song.id} href={`/track/${song.id}`}>
              <button
                onClick={() => {
                  if (playlistId !== undefined) {
                    setPlaylist(
                      getPlaylistByAlbumId(playlistId),
                      // albums.find((album) => album.id === playlistId)?.tracks
                    );
                  }
                  // setPlaylist(albums
                  //   .find((album) => album.id === playlistId)?.tracks);
                  setSong(song);
                }}
              >
                <FaPlay />
              </button>
            </Link>
            {/* </Link> */}
            {/* <p>{index + 1}</p> */}
            <Link
              // key={song.id}
              href={`/track/${song.id}`}
            >
              {/* <p>{`${song.id} ${index} ${key}`}</p> */}
              <p>{song.title}</p>
            </Link>
            <p>{formatDuration(song.duration)}</p>
            {/* <p>{song.artist}</p> */}
          </li>
        ))}
      </ul>
    </section>
  );
};

export const MemoizedPlaylist = memo(Playlist);

function BadgesSection({ song }: { song: Track }) {
  if (!song.artwork || song.artwork.length === 0) return null;
  return (
    <div className={s.badgesSection}>
      <ArtworkBadge song={song} />
    </div>
  );
}

function ArtworkBadge({ song }: { song: Track }) {
  if (!song.artwork || song.artwork.length === 0) return null;
  return (
    <span className={s.badge + ' ' + s.artwork}>A {song.artwork.length}</span>
  );
}
