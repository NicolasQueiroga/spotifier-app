interface UserProps {
    country: string;
    display_name: string;
    email: string;
    explicit_content: string;
    external_urls: ExternalUrlProps;
    followers: FollowersProps;
    href: string;
    id: string;
    images: string;
    product: string;
    type: string;
    uri: string;
}

interface ArtistProps {
    external_urls: ExternalUrlProps;
    followers: FollowersProps;
    genres: Array<string>;
    href: string;
    id: string;
    images: Array<ImageProps>;
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface AlbumProps {
    album_type: string;
    artists: Array<ArtistProps>;
    available_markets: Array<string>;
    external_urls: ExternalUrlProps;
    href: string;
    id: string;
    images: Array<ImageProps>;
    name: string;
    release_date: Date;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

interface TrackProps {
    album: AlbumProps;
    artists: Array<ArtistProps>;
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: Object;
    external_urls: ExternalUrlProps;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}

interface ImageProps {
    heigth: number;
    url: string;
    width: number;
}

interface ExternalUrlProps {
    spotify: string;
}

interface ExplicitContentProps {
    filter_enabled: boolean;
    filter_locked: boolean;
}

interface FollowersProps {
    href: any;
    total: number;
}

interface OwnerProps {
    display_name: string;
    external_urls: ExternalUrlProps;
    href: string;
    id: string;
    type: string;
    uri: string;
}

interface PlaylistProps {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrlProps;
    href: string;
    id: string;
    images: Array<ImageProps>;
    name: string;
    owner: OwnerProps;
    primary_color: any;
    public: boolean;
    snapshot_id: string;
    tracks: Object;
    type: string;
    uri: string;
}
interface BaseProps {
    href: string;
    limit: number;
    next: string;
    ofset: number;
    previous: string;
    total: number;
}

interface AlbumsProps extends BaseProps {
    items: Array<AlbumProps>;
}

interface ArtistsProps extends BaseProps {
    items: Array<ArtistProps>;
}

interface PlaylistsProps extends BaseProps {
    items: Array<PlaylistProps>;
}

interface TracksProps extends BaseProps {
    items: Array<TrackProps>;
}

interface SearchProps {
    albums: AlbumsProps;
    artists: ArtistsProps;
    playlists: PlaylistsProps;
    tracks: TracksProps;
}
