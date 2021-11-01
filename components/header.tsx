import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

const Header = () => {
  const [session, loading] = useSession();

  return (
    <header>
      <nav>
        <>
          {!session && (
            <>
              <Link href="/api/auth/signin">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signIn('Spotify', {
                      callbackUrl: `${window.location.origin}/user`,
                    });
                  }}
                >
                  <button>Sign in</button>
                </a>
              </Link>
            </>
          )}
          {session && (
            <>
              <Link href="/user">
                <a className="logo">
                  <h1>Spotifier</h1>
                </a>
              </Link>
              <Link href="/user/search">
                <a>
                  Search
                </a>
              </Link>
              <Link href="/api/auth/signout">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signOut({
                      callbackUrl: `${window.location.origin}`,
                    });
                  }}
                >
                  <button>Sign out</button>
                </a>
              </Link>
            </>
          )}
        </>
      </nav>
    </header>
  );
};

export default Header;
