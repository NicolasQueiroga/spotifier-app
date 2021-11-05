/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import Layout from "../../components/layout";
import Head from "next/head";
import styles from "../../styles/pages/user/Search.module.css";
import { getSpotifyClient } from "../../sevices/spotify";
import React, { useEffect, useState } from "react";
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

const Search = () => {
  const [session, loading] = useSession();

  const [ran, setRun] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    setExpanded(false);
    loadSearch(searchText);
  }, [searchText]);

  function onSearchTextChange(e: any) {
    setSearchText(e.target.value);
  }

  function showContent() {
    if (searchText.length >= 0 && !ran) {
      var e = document.getElementById("resultContainer") as HTMLElement;
      e.style.display = "flex";
      var s = document.getElementById("searchBar") as HTMLElement;
      s.style.marginTop = "4vh";

      var elms = document.querySelectorAll(
        "[id='title']"
      ) as NodeListOf<HTMLElement>;
      for (var i = 0; i < elms.length; i++) elms[i].style.display = "unset";
      setRun(true);
    }
  }

  function mainContent() {
    if (expanded) {
      var e1 = document.getElementById("resultContainer") as HTMLElement;
      var e2 = document.getElementById("artistsContainer") as HTMLElement;
      var e3 = document.getElementById("albumsContainer") as HTMLElement;
      var e4 = document.getElementById("playlistsContainer") as HTMLElement;
      var e5 = document.getElementById("tracksContainer") as HTMLElement;
      var elms = document.querySelectorAll(
        "[id='img']"
      ) as NodeListOf<HTMLElement>;
      for (var i = 0; i < elms.length; i++) elms[i].removeAttribute("style");

      const l = [e1, e2, e3, e4, e5];
      for (let i = 0; i < 5; i++) l[i].removeAttribute("style");

      var e = document.getElementById("resultContainer") as HTMLElement;
      e.style.display = "flex";
      var s = document.getElementById("searchBar") as HTMLElement;
      s.style.marginTop = "4vh";

      var elms = document.querySelectorAll(
        "[id='title']"
      ) as NodeListOf<HTMLElement>;
      for (var i = 0; i < elms.length; i++) elms[i].style.display = "unset";
      setExpanded(false);
    }
  }

  function expandArtist() {
    expand("artistsContainer");
  }
  function expandAlbum() {
    expand("albumsContainer");
  }
  function expandPlaylist() {
    expand("playlistsContainer");
  }
  function expandTrack() {
    expand("tracksContainer");
  }

  function expand(id: string) {
    setExpanded(true);
    var containerElement = document.getElementById(
      "resultContainer"
    ) as HTMLElement;
    containerElement.style.cssText = `display: flex;
    height: 60vh;`;

    var elms = document.querySelectorAll(
      "[id='img']"
    ) as NodeListOf<HTMLElement>;
    for (var i = 0; i < elms.length; i++)
      elms[i].style.cssText = `height: 250px; width: 250px;`;

    let ids = [
      "artistsContainer",
      "albumsContainer",
      "playlistsContainer",
      "tracksContainer",
    ];
    var e1 = document.getElementById(ids[0]) as HTMLElement;
    var e2 = document.getElementById(ids[1]) as HTMLElement;
    var e3 = document.getElementById(ids[2]) as HTMLElement;
    var e4 = document.getElementById(ids[3]) as HTMLElement;
    var e5 = document.getElementById(ids[4]) as HTMLElement;
    const l = [e1, e2, e3, e4, e5];
    let show = 0;
    for (let i = 0; i < 4; i++) {
      if (id === ids[i]) show = i;
      else {
        l[i].style.display = "none";
      }
    }
    l[show].style.cssText = `display: flex;
                                width: 72vw; 
                                height: 58vh; 
                                transform: none; 
                                overflow-y: auto; 
                                maxHeight: none; 
                                minHeight: none;`;

    var elms = document.querySelectorAll(
      "[id='artist']"
    ) as NodeListOf<HTMLElement>;
    for (var i = 0; i < elms.length; i++)
      elms[i].style.cssText = `
    display: flex;
    margin-left: 25vw;
    height: 26vh;
    flex-direction: row;
    align-items: baseline;`;
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
                onClick={mainContent}
              />
            </div>
            <div className={styles.clickHere} onClick={mainContent}></div>
            <div className={styles.resultContainer} id="resultContainer">
              <div
                className={styles.artistsContainer}
                id="artistsContainer"
                onClick={expandArtist}
              >
                <p className={styles.title} id="title">
                  Artists
                </p>
                {searchVal?.artists?.items?.map((a) => {
                  try {
                    return (
                      <>
                        <div key={a.id} className={styles.artists}>
                          <img
                            className={styles.img}
                            src={a.images[0].url}
                            alt="Picture of the artist"
                            id="img"
                          />
                        </div>
                      </>
                    );
                  } catch (error) {
                    console.log(error);
                  }
                })}
              </div>
              <div
                className={styles.albumsContainer}
                id="albumsContainer"
                onClick={expandAlbum}
              >
                <p className={styles.title} id="title">
                  Albums
                </p>
                {searchVal?.albums?.items?.map((a) => {
                  try {
                    return (
                      <div key={a.id} className={styles.albums}>
                        <img
                          className={styles.img}
                          src={a.images[0].url}
                          alt="Picture of the album"
                          id="img"
                        />
                      </div>
                    );
                  } catch (error) {
                    console.log(error);
                  }
                })}
              </div>
              <div
                className={styles.playlistsContainer}
                id="playlistsContainer"
                onClick={expandPlaylist}
              >
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
                          id="img"
                        />
                      </div>
                    );
                  } catch (error) {
                    console.log(error);
                  }
                })}
              </div>
              <div
                className={styles.tracksContainer}
                id="tracksContainer"
                onClick={expandTrack}
              >
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
                          id="img"
                        />
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
  if (!session)
    return (
      <Layout>
        <div className={styles.noSession}>
          <h1>No Session!</h1>
        </div>
      </Layout>
    );
};

export default Search;
