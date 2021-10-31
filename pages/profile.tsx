import { useSession } from 'next-auth/client';
import { getToken } from 'next-auth/jwt';
import Layout from '../components/layout';

const Profile = () => {
  const [session, loading] = useSession();

  if (loading) return <div>loading...</div>;
  if (!session) return <div>no session</div>;

  return (
    <Layout>
      {session && (
        <>
          <h1>Logged {session.user?.accessToken}</h1>
        </>
      )}
    </Layout>
  );
};

export default Profile;