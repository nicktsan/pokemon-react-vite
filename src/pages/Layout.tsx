import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Poke Search</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/sendtokens">Send Tokens</Link>
          </li>
        </ul>
      </nav>
      <h1>{import.meta.env.OTHER_API_KEY}</h1>
      <Outlet />
    </>
  )
};

export default Layout;