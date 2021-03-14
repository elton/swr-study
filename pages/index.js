import Head from 'next/head';
import fetchJson from '../lib/fetchJson';
import useSWR from 'swr';
import Image from 'next/Image';

export default function Home(props) {
  const { data, error } = useSWR(
    'https://qmusic.elton.run/recommend/playlist/u',
    fetchJson,
    {
      initialData: props.albums,
    }
  );

  return (
    <>
      <Head>
        <title>Online music</title>
      </Head>
      <div className='m-5'>
        <h2 className='mt-2 md-5'>推荐专辑</h2>
        {data.data.list.map((album) => (
          <div key={album.content_id}>
            <Image src={album.cover} width='200' height='200'></Image>
            <p>{album.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const albums = await fetchJson(
    'https://qmusic.elton.run/recommend/playlist/u'
  );
  return { props: { albums } };
}
