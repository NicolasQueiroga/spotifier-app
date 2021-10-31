import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/client';

const Header = () => {
  const [session, loading] = useSession();

  return (
    <header>
      <nav>
        <Link href="/">
          <a className="logo">
            <h1>Spotifier</h1>
          </a>
        </Link>

        <p>
          {!session && (
            <Link href="/api/auth/signin">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                <button className="signInButton">Sign in</button>
              </a>
            </Link>
          )}
          {session && (
            <>
              <Link href="/profile">
                <a>
                  profile
                </a>
              </Link>
              <Link href="/api/auth/signout">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  <button className="signOutButton">Sign out</button>
                </a>
              </Link>
            </>
          )}
        </p>
      </nav>
    </header>
  );
};

export default Header;
