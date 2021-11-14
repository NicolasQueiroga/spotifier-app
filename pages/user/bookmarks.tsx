/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { api } from "../../sevices/api";
import { useSession } from "next-auth/client";
import Layout from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import router from "next/router";
import styles from "../../styles/pages/user/Bookmarks.module.css";
import { getSpotifyClient } from "../../sevices/spotify";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";

const Bookmarks = () => {
  const [session, loading] = useSession();
  const { "app.accessToken": accessToken } = parseCookies();

  const [expanded, setExpanded] = useState(false);

  const [user, setUser] = useState<ApiUserProps>();
  const [userId, setUserId] = useState("");
  useEffect(() => {
    async function loadUser() {
      if (accessToken) {
        try {
          const { data: user } = await api.get(`/auth/users/me`);
          console.log(user);
          setUser(user);
          setUserId(user.id);
        } catch (error) {
          console.log(error);
        }
      }
    }
    setExpanded(false);
    loadUser();
  }, [accessToken]);

  const [artistIds, setArtistIds] = useState<Array<ApiArtistProps>>([]);
  const [albumIds, setAlbumIds] = useState<Array<ApiAlbumProps>>([]);
  const [playlistIds, setPlaylistIds] = useState<Array<ApiPlaylistProps>>([]);
  const [trackIds, setTrackIds] = useState<Array<ApiTrackProps>>([]);
  useEffect(() => {
    async function loadId() {
      if (accessToken) {
        try {
          const { data: artistResponse } = await api.get(
            `/bookmark/artist/?user=${userId}`
          );
          const { data: albumResponse } = await api.get(
            `/bookmark/album/?user=${userId}`
          );
          const { data: playlistResponse } = await api.get(
            `/bookmark/playlist/?user=${userId}`
          );
          const { data: trackResponse } = await api.get(
            `/bookmark/track/?user=${userId}`
          );

          setArtistIds(artistResponse);
          setAlbumIds(albumResponse);
          setPlaylistIds(playlistResponse);
          setTrackIds(trackResponse);
        } catch (error) {
          console.log(error);
        }
      }
    }

    loadId();
    setExpanded(false);
  }, [accessToken, userId]);

  const [currentArtist, setCurrentArtist] = useState<ArtistProps>();
  const [artistList, setArtistList] = useState<Array<ArtistProps>>([]);
  useEffect(() => {
    async function loadBookmarks() {
      try {
        if (accessToken) {
          const spotify = await getSpotifyClient();

          for (let i = 0; i < artistIds?.length; i++) {
            let id = artistIds[i].artist;
            if (id) {
              try {
                const { data: artistResponse } = await spotify.get(
                  `/artists/${id}`
                );
                if (!artistList.includes(artistResponse))
                  setArtistList((currentArtist) => [
                    ...currentArtist,
                    artistResponse,
                  ]);
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadBookmarks();
  }, [accessToken, artistIds]);
  console.log(artistList);

  const [currentAlbum, setCurrentAlbum] = useState<AlbumProps>();
  const [albumList, setAlbumList] = useState<Array<AlbumProps>>([]);
  useEffect(() => {
    async function loadAlbums() {
      try {
        if (accessToken) {
          const spotify = await getSpotifyClient();
          for (let i = 0; i < albumIds?.length; i++) {
            let id = albumIds[i].album;
            if (id) {
              try {
                const { data: albumResponse } = await spotify.get(
                  `/albums/${id}`
                );
                if (!albumList.includes(albumResponse))
                  setAlbumList((currentAlbum) => [
                    ...currentAlbum,
                    albumResponse,
                  ]);
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadAlbums();
  }, [accessToken, albumIds]);

  const [currentPlaylist, setCurrentPlaylist] = useState<PlaylistProps>();
  const [playlistList, setPlaylistList] = useState<Array<PlaylistProps>>([]);
  useEffect(() => {
    async function loadPlaylists() {
      try {
        if (accessToken) {
          const spotify = await getSpotifyClient();
          for (let i = 0; i < playlistIds?.length; i++) {
            let id = playlistIds[i].playlist;
            if (id) {
              try {
                const { data: playlistResponse } = await spotify.get(
                  `/playlists/${id}`
                );
                if (!playlistList.includes(playlistResponse))
                  setPlaylistList((currentPlaylist) => [
                    ...currentPlaylist,
                    playlistResponse,
                  ]);
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadPlaylists();
  }, [accessToken, playlistIds]);

  const [currentTrack, setCurrentTrack] = useState<TrackProps>();
  const [trackList, setTrackList] = useState<Array<TrackProps>>([]);
  useEffect(() => {
    async function loadTacks() {
      try {
        if (accessToken) {
          const spotify = await getSpotifyClient();

          for (let i = 0; i < trackIds?.length; i++) {
            let id = trackIds[i].track;
            if (id) {
              try {
                const { data: trackResponse } = await spotify.get(
                  `/tracks/${id}`
                );
                if (!trackList.includes(trackResponse))
                  setTrackList((currentTrack) => [
                    ...currentTrack,
                    trackResponse,
                  ]);
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadTacks();
  }, [accessToken, trackIds]);

  const [run, setRun] = useState(false);
  function showContent() {
    if (run) {
      var e = document.getElementById("resultContainer") as HTMLElement;
      e.style.display = "flex";

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

  async function deleteBookmark(type: string, id: string) {
    let itemId = "";
    switch (type) {
      case "artist":
        for (let i = 0; i < artistIds.length; i++) {
          if (artistIds[i].artist === id) itemId = artistIds[i].id;
        }
        break;

      case "album":
        for (let i = 0; i < albumIds.length; i++) {
          if (albumIds[i].album === id) itemId = albumIds[i].id;
        }
        break;

      case "playlsit":
        for (let i = 0; i < playlistIds.length; i++) {
          if (playlistIds[i].playlist === id) itemId = playlistIds[i].id;
        }
        break;

      case "track":
        for (let i = 0; i < trackIds.length; i++) {
          if (trackIds[i].track === id) itemId = trackIds[i].id;
        }
        break;

      default:
        break;
    }
    try {
      await api.delete(`/bookmark/${type}/${itemId}/`);
    } catch (error) {
      console.log(error);
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
  if (session && !loading && !accessToken) {
    router.push("/auth");
    return null;
  }
  if (session && !loading && accessToken)
    return (
      <Layout>
        <Head>
          <title>Spotifier</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {session && (
          <div className={styles.container}>
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
                  {artistList.map((a, i) => {
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
                                onClick={async () =>
                                  await deleteBookmark("artist", a.id)
                                }
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
                  {albumList.map((a, i) => {
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
                              onClick={async () =>
                                await deleteBookmark("album", a.id)
                              }
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
                  {playlistList.map((a, i) => {
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
                              onClick={async () =>
                                await deleteBookmark("playlist", a.id)
                              }
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
                  {trackList.map((a, i) => {
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
                                onClick={async () =>
                                  await deleteBookmark("track", a.id)
                                }
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

export default Bookmarks;
