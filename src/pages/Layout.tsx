import { Link, Outlet } from "react-router";
import LoginButton from "../components/LoginButton";

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
        </ul>
        <LoginButton />
      </nav>
      <h1>{import.meta.env.OTHER_API_KEY}</h1>
      <Outlet />
    </>
  )
};

export default Layout;