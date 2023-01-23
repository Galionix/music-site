import { useRouter } from 'next/router';
import { albums } from '../../playlist';
import { DefaultLayout } from '../../src/components/Layout';
import { getPlaylistByAlbumId } from '../../src/utils/file-utils';

export default function CollectionId() {
  const {
    query: { collection_id },
  } = useRouter();
  const album = albums.find(album => album.id === parseInt(`${collection_id}`));
  if (!album)
    return (
      <DefaultLayout>
        <h1>404</h1>
      </DefaultLayout>
    );
  const tracks = getPlaylistByAlbumId(parseInt(`${collection_id}`));
  console.log('tracks: ', tracks);
  return (
    <DefaultLayout playlistId={album.id} tracks={tracks}>
      <h1>{album.title}</h1>
      <h2>{album.description}</h2>
      {/* <span>collection_id: {collection_id}</span> */}
    </DefaultLayout>
  );
}
