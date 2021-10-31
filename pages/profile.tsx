import { useSession } from 'next-auth/client';
import Layout from '../components/layout';
import Head from 'next/head'
import styles from '../styles/pages/Profile.module.css'
import { useForm } from "react-hook-form";
import { getSpotifyClient } from '../sevices/spotify';
import Router from "next/router";


const Profile = () => {
  const { register, handleSubmit } = useForm();
  const [session, loading] = useSession();

  if (loading) return <div>loading...</div>;
  if (!session) return (Router.push('/api/auth/signin'));


  async function search(data: any) {
    const spotify = await getSpotifyClient(session.user?.accessToken);

    const body = {
      q: data['searchBar'] as string,
      types: [data['album'] ? 'album' : '', data['artist'] ? 'artist' : '', data['playlist'] ? 'playlist' : '', data['track'] ? 'track' : ''],
    };

    let type = [];
    for (let i in data) {
      if (data[i] && i !== 'searchBar')
        type.push(i)
    }

    try {
      const { data: response } = await spotify.get(`/search?q=${body.q}&type=${type}`);
      console.log(response);
    } catch (error: any) {
      console.log(error.response);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Spotifier</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session && (
        <>
          <form className={styles.searchBar} onSubmit={handleSubmit(search)}>
            <input {...register('searchBar')} type="text" name="searchBar" id="searchBar" placeholder="Search" />
            <div className={styles.checkBoxContainer}>
              <div className={styles.checkBox}>
                <input {...register('album')} type="checkbox" name="album" id="album" />
                <label htmlFor="album">Album</label>
              </div>

              <div className={styles.checkBox}>
                <input {...register('artist')} type="checkbox" name="artist" id="artist" />
                <label htmlFor="artist">Artist</label>
              </div>

              <div className={styles.checkBox}>
                <input {...register('playlist')} type="checkbox" name="playlist" id="playlist" />
                <label htmlFor="playlist">playlist</label>
              </div>

              <div className={styles.checkBox}>
                <input {...register('track')} type="checkbox" name="track" id="track" />
                <label htmlFor="track">Track</label>
              </div>
            </div>

            <button type="submit">Search</button>
          </form>
        </>
      )}
    </Layout>
  );
};

export default Profile;
