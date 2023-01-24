import { useRouter } from 'next/router';
import { albums } from '../../playlist';
import { DefaultLayout } from '../../src/components/Layout';
import { MyHead } from '../../src/components/MyHead';
import { getPlaylistByAlbumId } from '../../src/utils/file-utils';
import s from '@/styles/CollectionPage.module.scss';
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
  return (
    <>
      <MyHead
        title={album.title}
        description={album.description}
        keywords='playlist, music, thedimas'
      />
      <DefaultLayout playlistId={album.id} tracks={tracks}>
        <section className={s.collection}>
          <h1>{album.title}</h1>
          <h2>{album.description}</h2>
        </section>
        {/* <span>collection_id: {collection_id}</span> */}
      </DefaultLayout>
    </>
  );
}
