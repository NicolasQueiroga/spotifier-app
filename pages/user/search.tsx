/* eslint-disable @next/next/no-img-element */
import { useSession } from "next-auth/client";
import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/pages/user/Search.module.css";
import { getSpotifyClient } from "../../sevices/spotify";
import React, { useEffect, useState } from "react";
import { api } from "../../sevices/api";
import { parseCookies } from "nookies";
import router from "next/router";

const Search = () => {
  const [session, loading] = useSession();

  const [ran, setRun] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const { "app.accessToken": accessToken } = parseCookies();
  console.log('search ', accessToken);

  const [searchVal, setSearch] = useState<SearchProps>();
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    async function loadSearch(searchText: string) {
      try {
        if (searchText.length > 0) {
          const spotify = await getSpotifyClient();
          const response = await spotify.get(
            `/search?q=${searchText}&type=album,artist,playlist,track`
          );

          console.log(response.data);
          setSearch(response.data);
        }
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

      let content = ["artists", "albums", "playlists", "tracks"];
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
    expand("artistsContainer", "artists");
  }
  function expandAlbum() {
    expand("albumsContainer", "albums");
  }
  function expandPlaylist() {
    expand("playlistsContainer", "playlists");
  }
  function expandTrack() {
    expand("tracksContainer", "tracks");
  }

  function expand(id1: string, id2: string) {
    setExpanded(true);
    var containerElement = document.getElementById(
      "resultContainer"
    ) as HTMLElement;

    containerElement.style.cssText = `
    display: flex;
    height: 60vh;
    flex-direction: column;`;

    var elms = document.querySelectorAll(
      "[id='img']"
    ) as NodeListOf<HTMLElement>;
    for (var i = 0; i < elms.length; i++)
      elms[i].style.cssText = `height: 250px; width: 250px;`;

    let ids1 = [
      "artistsContainer",
      "albumsContainer",
      "playlistsContainer",
      "tracksContainer",
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

    l1[show1].style.cssText = `
    display: flex;
    width: 65vw; 
    height: 58vh; 
    transform: none; 
    overflow-y: auto; 
    maxHeight: none; 
    minHeight: none;
    flex-wrap: nowrap;
    flex-direction: column;`;

    let ids2 = ["artists", "albums", "playlists", "tracks"];
    for (let k = 0; k < 4; k++) {
      if (id2 !== ids2[k]) {
        var elms = document.querySelectorAll(
          `[id='${ids2[k]}']`
        ) as NodeListOf<HTMLElement>;
        for (var j = 0; j < elms.length; j++) elms[j].style.display = "none";
      }
    }

    var elms = document.querySelectorAll(
      "[id='title']"
    ) as NodeListOf<HTMLElement>;
    for (var i = 0; i < elms.length; i++) elms[i].style.display = "none";
  }

  async function addBookmark(type: string, id: string) {
    try {
      const body = {
        [type]: id,
      }
      const { data: response } = await api.post(`/bookmark/${type}/`, body)
      console.log(response);
    } catch (error) {
      console.log(error)
      router.push('/auth/')
    }
  }

  if (loading) return <div>loading...</div>;
  if (!session)
    return (
      <Layout>
        <div className={styles.noSession}>
          <h1>No Session!</h1>
        </div>
      </Layout>
    );
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
                  {searchVal?.artists?.items?.map((a, i) => {
                    try {
                      if (!expanded)
                        return (
                          <>
                            <div key={i} className={styles.artists}>
                              <img
                                style={{ height: "60px", width: "60px" }}
                                src={a.images[0].url}
                                alt="Picture of the artist"
                                id="img"
                              />
                            </div>
                          </>
                        );
                      return (
                        <>
                          <div
                            key={i}
                            className={styles.artists}
                            id="artists"
                            style={{ display: "flex" }}
                          >
                            <div className={styles.imgContainer}>
                              <img
                                className={styles.img}
                                style={{ height: "250px", width: "250px" }}
                                src={a.images[0].url}
                                alt="Picture of the album"
                                id="img"
                                onClick={async () => await addBookmark('artist', a.id)}
                              />
                              <p className={styles.imgText}>Bookmark</p>
                            </div>
                            <div className={styles.content} id="content">
                              <Link href={a.external_urls.spotify}>
                                <a>
                                  <p className={styles.name}>{a.name}</p>
                                </a>
                              </Link>
                              <div className={styles.followers}>
                                <p className={styles.name}>Followers:</p>
                                <p>{a.followers.total}</p>
                              </div>
                              <div className={styles.genres}>
                                <p className={styles.name}>Genres:</p>
                                <ul>
                                  {a.genres.length >= 0 &&
                                    a.genres
                                      .slice(0, 5)
                                      .map((g, i) => <li key={i}>{g}</li>)}
                                  {a.genres.length === 0 && <p>No Data</p>}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </>
                      );
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
                  {searchVal?.albums?.items?.map((a, i) => {
                    try {
                      if (!expanded)
                        return (
                          <div key={i} className={styles.albums}>
                            <img
                              style={{ height: "60px", width: "60px" }}
                              src={a.images[0].url}
                              alt="Picture of the album"
                              id="img"
                            />
                          </div>
                        );
                      return (
                        <div
                          key={i}
                          className={styles.albums}
                          id="albums"
                          style={{ display: "flex" }}
                        >
                          <div className={styles.imgContainer}>
                            <img
                              className={styles.img}
                              style={{ height: "250px", width: "250px" }}
                              src={a.images[0].url}
                              alt="Picture of the album"
                              id="img"
                              onClick={async () => await addBookmark('album', a.id)}
                            />
                            <p className={styles.imgText}>Bookmark</p>
                          </div>
                          <div className={styles.content} id="content">
                            <Link href={a.external_urls.spotify}>
                              <a>
                                <p className={styles.name}>{a.name}</p>
                              </a>
                            </Link>
                            <div className={styles.albumArtists}>
                              <p className={styles.name}>Artists</p>
                              <ul>
                                {a.artists.map((b, i) => (
                                  <li key={i}>{b.name}</li>
                                ))}
                              </ul>
                            </div>
                            <div className={styles.albumTracks}>
                              <p className={styles.name}>Total Tracks</p>
                              <p>{a.total_tracks}</p>
                            </div>
                            <div className={styles.releaseDate}>
                              <p className={styles.name}>Release Date:</p>
                              <p>{a.release_date}</p>
                            </div>
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
                  {searchVal?.playlists?.items?.map((a, i) => {
                    try {
                      if (!expanded)
                        return (
                          <div key={i} className={styles.playlists}>
                            <img
                              style={{ height: "60px", width: "60px" }}
                              src={a.images[0].url}
                              alt="Picture of the playlist"
                              id="img"
                            />
                          </div>
                        );
                      return (
                        <div
                          key={i}
                          className={styles.playlists}
                          id="playlists"
                          style={{ display: "flex" }}
                        >
                          <div className={styles.imgContainer}>
                            <img
                              className={styles.img}
                              style={{ height: "250px", width: "250px" }}
                              src={a.images[0].url}
                              alt="Picture of the album"
                              id="img"
                              onClick={async () => await addBookmark('playlist', a.id)}
                            />
                            <p className={styles.imgText}>Bookmark</p>
                          </div>
                          <div className={styles.content} id="content">
                            <Link href={a.external_urls.spotify}>
                              <a>
                                <p className={styles.name}>{a.name}</p>
                              </a>
                            </Link>
                            <div className={styles.owner}>
                              <p className={styles.name}>Owner</p>
                              <p>{a.owner.display_name}</p>
                            </div>
                            <div className={styles.description}>
                              <p className={styles.name}>Description</p>
                              <p>{a.description}</p>
                            </div>
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
                  Tracks
                </p>
                <div
                  className={styles.tracksContainer}
                  id="tracksContainer"
                  onClick={expandTrack}
                >
                  {searchVal?.tracks?.items?.map((a, i) => {
                    try {
                      if (!expanded)
                        return (
                          <div key={i} className={styles.tracks}>
                            <img
                              style={{ height: "60px", width: "60px" }}
                              src={a.album.images[0].url}
                              alt="Picture of the track album"
                              id="img"
                            />
                          </div>
                        );
                      return (
                        <div
                          key={i}
                          className={styles.tracks}
                          id="tracks"
                          style={{ display: "flex" }}
                        >
                          <div className={styles.preview}>
                            <div className={styles.imgContainer}>
                              <img
                                className={styles.img}
                                style={{ height: "250px", width: "250px" }}
                                src={a.album.images[0].url}
                                alt="Picture of the album"
                                id="img"
                                onClick={async () => {
                                  await addBookmark('track', a.id)
                                }}
                              />
                              <p className={styles.imgText}>Bookmark</p>
                            </div>
                            <audio controls>
                              <source src={a.preview_url} />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                          <div className={styles.content} id="content">
                            <Link href={a.external_urls.spotify}>
                              <a>
                                <p className={styles.name}>{a.name}</p>
                              </a>
                            </Link>
                            <div className={styles.trackArtist}>
                              <p className={styles.name}>Artists:</p>
                              <ul>
                                {a.artists.map((b, i) => (
                                  <li key={i}>{b.name}</li>
                                ))}
                              </ul>
                            </div>
                            <div className={styles.trackAlbum}>
                              <p className={styles.name}>Album:</p>
                              <p>{a.album.name}</p>
                            </div>
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
};

export default Search;
