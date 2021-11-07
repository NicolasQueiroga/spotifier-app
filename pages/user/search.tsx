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
      for (var i = 0; i < elms.length; i++) elms[i].style.display = 'unset';

      let content = ['artists', 'albums', 'playlists', 'tracks'];
      for (let n in content) {
        var elms = document.querySelectorAll(
          `[id='${content[n]}']`
        ) as NodeListOf<HTMLElement>;
        for (var j = 0; j < elms.length; j++)
          elms[j].style.cssText = `display: flex;`;
      }

      setExpanded(false);
    }
  }

  function expandArtist() {
    expand("artistsContainer", 'artists');
  }
  function expandAlbum() {
    expand("albumsContainer", 'albums');
  }
  function expandPlaylist() {
    expand("playlistsContainer", 'playlists');
  }
  function expandTrack() {
    expand("tracksContainer", 'tracks');
  }

  function expand(id1: string, id2: string) {
    setExpanded(true);
    var containerElement = document.getElementById("resultContainer") as HTMLElement;
    containerElement.style.cssText = `display: flex;
                                      height: 60vh;`;

    var elms = document.querySelectorAll(
      "[id='img']"
    ) as NodeListOf<HTMLElement>;
    for (var i = 0; i < elms.length; i++)
      elms[i].style.cssText = `height: 250px; width: 250px;`;

    let ids1 = [
      "artistsContainer",
      "albumsContainer",
      "playlistsContainer",
      "tracksContainer"
    ];
    var e1 = document.getElementById(ids1[0]) as HTMLElement;
    var e2 = document.getElementById(ids1[1]) as HTMLElement;
    var e3 = document.getElementById(ids1[2]) as HTMLElement;
    var e4 = document.getElementById(ids1[3]) as HTMLElement;
    var e5 = document.getElementById(ids1[4]) as HTMLElement;
    const l1 = [e1, e2, e3, e4, e5];
    let show1 = 0;
    for (let i = 0; i < 4; i++) {
      if (id1 === ids1[i]) show1 = i;
      else l1[i].style.display = "none";
    }

    let ids2 = [
      "artists",
      "albums",
      "playlists",
      "tracks"
    ];

    let show2 = 0;
    for (let i = 0; i < 4; i++) {
      if (id2 === ids2[i]) show2 = i;
      else {
        var elms = document.querySelectorAll(
          `[id='${ids2[i]}']`
        ) as NodeListOf<HTMLElement>;
        for (var j = 0; j < elms.length; j++)
          elms[j].style.display = "none";
      }
    }

    l1[show1].style.cssText = `display: flex;
                             width: 72vw; 
                             height: 58vh; 
                             transform: none; 
                             overflow-y: auto; 
                             maxHeight: none; 
                             minHeight: none;
                             flex-wrap: nowrap;
                             flex-direction: column;`;

    var elms = document.querySelectorAll(
      `[id='${ids2[show2]}']`
    ) as NodeListOf<HTMLElement>;
    for (var j = 0; j < elms.length; j++)
      elms[j].style.cssText = `display: flex;`;

    var elms = document.querySelectorAll(
      "[id='title']"
    ) as NodeListOf<HTMLElement>;
    for (var i = 0; i < elms.length; i++)
      elms[i].style.display = "none";
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
              <div className={styles.box}>
                <p className={styles.title} id="title">
                  Artists
                </p>
                <div
                  className={styles.artistsContainer}
                  id="artistsContainer"
                  onClick={expandArtist}
                >
                  {searchVal?.artists?.items?.map((a) => {
                    try {
                      if (!expanded)
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
                      return (
                        <>
                          <div key={a.id} className={styles.artists} id='artists'>
                            <img
                              className={styles.img}
                              src={a.images[0].url}
                              alt="Picture of the artist"
                              id="img"
                            />
                            <div className={styles.content} id='content'>
                              <p>{a.name}</p>
                            </div>
                          </div>
                        </>
                      )
                    } catch (error) {
                      console.log(error);
                    }
                  })}
                </div>
              </div>
              <div className={styles.box}>
                <p className={styles.title} id="title">
                  Albums
                </p>
                <div
                  className={styles.albumsContainer}
                  id="albumsContainer"
                  onClick={expandAlbum}
                >
                  {searchVal?.albums?.items?.map((a) => {
                    try {
                      if (!expanded)
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
                      return (
                        <div key={a.id} className={styles.albums} id='albums'>
                          <img
                            className={styles.img}
                            src={a.images[0].url}
                            alt="Picture of the album"
                            id="img"
                          />
                          <div className={styles.content} id='content'>
                            <p>{a.name}</p>
                          </div>
                        </div>
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  })}
                </div>
              </div>
              <div className={styles.box}>
                <p className={styles.title} id="title">
                  Playlists
                </p>
                <div
                  className={styles.playlistsContainer}
                  id="playlistsContainer"
                  onClick={expandPlaylist}
                >
                  {searchVal?.playlists?.items?.map((a) => {
                    try {
                      if (!expanded)
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
                      return (
                        <div key={a.id} className={styles.playlists} id='playlists'>
                          <img
                            className={styles.img}
                            src={a.images[0].url}
                            alt="Picture of the playlist"
                            id="img"
                          />
                          <div className={styles.content} id='content'>
                            <p>{a.name}</p>
                          </div>
                        </div>
                      )
                    } catch (error) {
                      console.log(error);
                    }
                  })}
                </div>
              </div>
              <div className={styles.box}>
                <p className={styles.title} id="title">
                  Tracks
                </p>
                <div
                  className={styles.tracksContainer}
                  id="tracksContainer"
                  onClick={expandTrack}
                >
                  {searchVal?.tracks?.items?.map((a) => {
                    try {
                      if (!expanded)
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
                      return (
                        <div key={a.id} className={styles.tracks} id='tracks'>
                          <img
                            className={styles.img}
                            src={a.album.images[0].url}
                            alt="Picture of the track album"
                            id="img"
                          />
                          <div className={styles.content} id='content'>
                            <p>{a.name}</p>
                          </div>
                        </div>
                      );
                    } catch (error) {
                      console.log(error);
                    }
                  })}
                </div>
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
