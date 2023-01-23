import { albums, playlist, Track } from '../../playlist';
import { useMusicStore } from '../music.store';

export function getDuration(src: string, cb: (duration: number) => void) {
  const audio = new Audio();
  audio.src = src;
  audio.addEventListener('loadedmetadata', () => {
    cb(audio.duration);
  });
}

export function formatDuration(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

export function useNextTrack() {
  const { currentSong, loopPlaylist, currentPlaylist } = useMusicStore();
  const index = currentPlaylist.findIndex(
    track => track.id === currentSong?.id,
  );
  if (currentPlaylist[index + 1] === undefined && loopPlaylist) {
    return currentPlaylist[0];
  }
  return currentPlaylist[index + 1];
}

export function usePreviousTrack() {
  const { currentSong, loopPlaylist, currentPlaylist } = useMusicStore();
  const index = currentPlaylist.findIndex(
    track => track.id === currentSong?.id,
  );
  if (currentPlaylist[index - 1] === undefined && loopPlaylist) {
    return currentPlaylist[currentPlaylist.length - 1];
  }
  return currentPlaylist[index - 1];
}

export function getSongById(id: string): Track | undefined {
  return playlist.find(track => `${track.id}` == id);
}

export function getPlaylistByAlbumId(id: number): Track[] {
  // console.log('id: ', id);

  const album = albums.find(album => album.id === id);
  // console.log('album: ', album);

  return playlist.filter(track =>
    albums.find(album => album.id === id)?.tracks.includes(track.id),
  );
}
