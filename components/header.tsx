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
            <a
              href="/api/auth/signin"
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              <button className="signInButton">Sign in</button>
            </a>
          )}
          {session && (
            <>
              <Link href="/profile">
                <a>
                  profile
                </a>
              </Link>
              <a
                href="/api/auth/signout"
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                <button className="signOutButton">Sign out</button>
              </a>
            </>
          )}
        </p>
      </nav>
    </header>
  );
};

export default Header;
