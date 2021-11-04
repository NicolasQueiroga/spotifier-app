/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import Layout from "../../components/layout";
import Head from "next/head";
import styles from "../../styles/pages/user/Search.module.css";
import { getSpotifyClient } from "../../sevices/spotify";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { artistProps, trackProps, albumProps, imageProps } from ".";

interface playlistProps {
  collaborative: boolean;
  description: string;
  external_urls: Object;
  href: string;
  id: string;
  images: Array<imageProps>;
  name: string;
  owner: Object;
  primary_color: any;
  public: boolean;
  snapshot_id: string;
  tracks: Object;
  type: string;
  uri: string;
}
interface baseProps {
  href: string;
  limit: number;
  next: string;
  ofset: number;
  previous: string;
  total: number;
}

interface albumsProps extends baseProps {
  items: Array<albumProps>;
}

interface artistsProps extends baseProps {
  items: Array<artistProps>;
}

interface playlistsProps extends baseProps {
  items: Array<playlistProps>;
}

interface tracksProps extends baseProps {
  items: Array<trackProps>;
}

interface searchProps {
  albums: albumsProps;
  artists: artistsProps;
  playlists: playlistsProps;
  tracks: tracksProps;
}


let ran = false;


const Search = () => {
  const [session, loading] = useSession();

  const [searchVal, setSearch] = useState<searchProps>();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    async function loadSearch(searchText: string) {
      try {
        const spotify = await getSpotifyClient();
        const response = await spotify.get(
          `/search?q=${searchText}&type=album,artist,playlist,track`
        );

        console.log(response.data);
        setSearch(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadSearch(searchText);
  }, [searchText]);

  function onSearchTextChange(e: any) {
    setSearchText(e.target.value);
  }

  const [topArtists, setTopArtists] = useState<Array<artistProps>>();
  useEffect(() => {
    async function loadTopArtists() {
      try {
        const spotify = await getSpotifyClient();
        const response = await spotify.get(
          "me/top/artists?time_range=short_term&limit=10"
        );

        console.log(response.data.items);
        setTopArtists(response.data.items);
      } catch (error) {
        console.log(error);
      }
    }
    loadTopArtists();
  }, []);

  const [topTracks, setTopTracks] = useState<Array<trackProps>>();
  useEffect(() => {
    async function loadTopTracks() {
      try {
        const spotify = await getSpotifyClient();
        const response = await spotify.get(
          "me/top/tracks?time_range=short_term&limit=10"
        );

        console.log(response.data.items);
        setTopTracks(response.data.items);
      } catch (error) {
        console.log(error);
      }
    }
    loadTopTracks();
  }, []);


  function showContent() {
    if (searchText.length >= 0 && !ran) {
      var e = document.getElementById("resultContainer") as any;
      e.style.display = "flex";
      var s = document.getElementById("searchBar") as any;
      s.style.marginTop = "4vh";

      var elms = document.querySelectorAll("[id='title']") as any;
      for (var i = 0; i < elms.length; i++) elms[i].style.display = "unset";
      ran = true;
    }
  }

  function mainContent() {
    var e1 = document.getElementById('resultContainer');
    var e2 = document.getElementById('artistsContainer');
    var e3 = document.getElementById('albumsContainer');
    var e4 = document.getElementById('playlistsContainer');
    var e5 = document.getElementById('tracksContainer');

    const l = [e1, e2, e3, e4, e5];
    for (let i = 0; i < 5; i++)
      l[i].removeAttribute("style");

    var e = document.getElementById("resultContainer") as any;
    e.style.display = "flex";
    var s = document.getElementById("searchBar") as any;
    s.style.marginTop = "4vh";

    var elms = document.querySelectorAll("[id='title']") as any;
    for (var i = 0; i < elms.length; i++) elms[i].style.display = "unset";
  }

  function expandArtist() {
    var containerElement = document.getElementById('resultContainer');
    var overlayEle = document.getElementById('artistsContainer');
    var hideEle1 = document.getElementById('albumsContainer');
    var hideEle2 = document.getElementById('playlistsContainer');
    var hideEle3 = document.getElementById('tracksContainer');


    containerElement.style.display = 'block';
    hideEle1.style.display = 'none';
    hideEle2.style.display = 'none';
    hideEle3.style.display = 'none';

    containerElement.style.height = '60vh';
    overlayEle.style.display = 'flex';
    overlayEle.style.width = '72vw';
    overlayEle.style.height = '60vh';
    overlayEle.style.marginLeft = '14vw';
    overlayEle.style.transform = 'scale(1)';
    overlayEle.style.overflowY = 'auto';

  }

  function expandAlbum() {
    var containerElement = document.getElementById('resultContainer');
    var overlayEle = document.getElementById('albumsContainer');
    var hideEle1 = document.getElementById('artistsContainer');
    var hideEle2 = document.getElementById('playlistsContainer');
    var hideEle3 = document.getElementById('tracksContainer');


    containerElement.style.display = 'block';
    hideEle1.style.display = 'none';
    hideEle2.style.display = 'none';
    hideEle3.style.display = 'none';

    containerElement.style.height = '60vh';
    overlayEle.style.display = 'flex';
    overlayEle.style.width = '72vw';
    overlayEle.style.height = '60vh';
    overlayEle.style.marginLeft = '14vw';
    overlayEle.style.transform = 'scale(1)';
    overlayEle.style.overflowY = 'auto';
  }
  function expandPlaylist() {
    var containerElement = document.getElementById('resultContainer');
    var overlayEle = document.getElementById('playlistsContainer');
    var hideEle1 = document.getElementById('albumsContainer');
    var hideEle2 = document.getElementById('artistsContainer');
    var hideEle3 = document.getElementById('tracksContainer');


    containerElement.style.display = 'block';
    hideEle1.style.display = 'none';
    hideEle2.style.display = 'none';
    hideEle3.style.display = 'none';

    containerElement.style.height = '60vh';
    overlayEle.style.display = 'flex';
    overlayEle.style.width = '72vw';
    overlayEle.style.height = '60vh';
    overlayEle.style.marginLeft = '14vw';
    overlayEle.style.transform = 'scale(1)';
    overlayEle.style.overflowY = 'auto';
  }
  function expandTrack() {
    var containerElement = document.getElementById('resultContainer');
    var overlayEle = document.getElementById('tracksContainer');
    var hideEle1 = document.getElementById('albumsContainer');
    var hideEle2 = document.getElementById('artistsContainer');
    var hideEle3 = document.getElementById('playlistsContainer');


    containerElement.style.display = 'block';
    hideEle1.style.display = 'none';
    hideEle2.style.display = 'none';
    hideEle3.style.display = 'none';

    containerElement.style.height = '60vh';
    overlayEle.style.display = 'flex';
    overlayEle.style.width = '72vw';
    overlayEle.style.height = '60vh';
    overlayEle.style.marginLeft = '14vw';
    overlayEle.style.transform = 'scale(1)';
    overlayEle.style.overflowY = 'auto';
  }

  if (loading) return <div>loading...</div>;
  if (session && !loading)
    return (
      <Layout>
        <Head>
          <title>Spotifier</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {session && (
          <div className={styles.container}>
            <div className={styles.searchBarContainer} id="searchBar">
              <input
                className={styles.searchBar}
                type="text"
                value={searchText}
                onChange={onSearchTextChange}
                onInput={showContent}
              />
            </div>
            <div className={styles.resultContainer} id="resultContainer">
              <div className={styles.artistsContainer} id='artistsContainer' onClick={expandArtist}>
                <p className={styles.title} id="title">
                  Artists
                </p>
                {searchVal?.artists?.items?.map((a) => {
                  try {
                    return (
                      <div key={a.id} className={styles.artists}>
                        <img className={styles.img} src={a.images[0].url} alt="Picture of the artist" />
                        <p className={styles.name}>{a.name}</p>
                      </div>
                    );
                  } catch (error) {
                    console.log(error);
                  }
                })}
              </div>
              <div className={styles.albumsContainer} id='albumsContainer' onClick={expandAlbum}>
                <p className={styles.title} id="title">
                  Albums
                </p>
                {searchVal?.albums?.items?.map((a) => {
                  try {
                    return (
                      <div key={a.id} className={styles.albums}>
                        <img className={styles.img} src={a.images[0].url} alt="Picture of the album" />
                        <p className={styles.name}>{a.name}</p>
                      </div>
                    );
                  } catch (error) {
                    console.log(error);
                  }
                })}
              </div>
              <div className={styles.playlistsContainer} id='playlistsContainer' onClick={expandPlaylist}>
                <p className={styles.title} id="title">
                  Playlists
                </p>
                {searchVal?.playlists?.items?.map((a) => {
                  try {
                    return (
                      <div key={a.id} className={styles.playlists}>
                        <img
                          className={styles.img}
                          src={a.images[0].url}
                          alt="Picture of the playlist"
                        />
                        <p className={styles.name}>{a.name}</p>
                      </div>
                    );
                  } catch (error) {
                    console.log(error);
                  }
                })}
              </div>
              <div className={styles.tracksContainer} id='tracksContainer' onClick={expandTrack}>
                <p className={styles.title} id="title">
                  Tracks
                </p>
                {searchVal?.tracks?.items?.map((a) => {
                  try {
                    return (
                      <div key={a.id} className={styles.tracks}>
                        <img
                          className={styles.img}
                          src={a.album.images[0].url}
                          alt="Picture of the track album"
                        />
                        <p className={styles.name}>{a.name}</p>
                      </div>
                    );
                  } catch (error) {
                    console.log(error);
                  }
                })}
              </div>
            </div>
          </div>
        )}
      </Layout>
    );
  if (!session) return (<Layout><div className={styles.noSession}><h1>No Session!</h1></div></Layout>);
};

export default Search;
