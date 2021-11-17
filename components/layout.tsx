import Header from "../components/header";

const Layout = ({ children }: any) => (
  <>
    <Header />
    <main className="container">{children}</main>
  </>
);

export default Layout;
