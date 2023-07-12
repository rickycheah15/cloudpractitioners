import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import {
  AboutIcon,
  CertificationsIcon,
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  ProfileIcon,
} from "../../common/svg";

export const NavView = () => {
  // console.log("render: NavView");
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  // console.log("LoggedIn: ", loggedIn);

  const navItemClassName =
    "bg-white button-hover-shadow button-outline text-sm m-3 p-1.5 rounded-md flex items-center space-x-2";

  const navItemSpan = "w-5 h-5 mr-2";

  const loginElement = (
    <li>
      <Link className={navItemClassName} to="/login">
        <span className={`${navItemSpan}`}>
          <LoginIcon />
        </span>
        Login
      </Link>
    </li>
  );

  const logoutElement = (
    <li>
      <Link className={navItemClassName} to="/logout">
        <span className={`${navItemSpan}`}>
          <LogoutIcon />
        </span>
        Logout
      </Link>
    </li>
  );

  const profileElement = (
    <li>
      <Link className={navItemClassName} to="/profile">
        <span className={`${navItemSpan}`}>
          <ProfileIcon />
        </span>
        My Profile
      </Link>
    </li>
  );

  return (
    <nav>
      <ul className="flex items-center">
        <li>
          {/* for links with svg "flex items-center space-x-2" is needed to center both icon and word */}
          <Link to="/" className={navItemClassName}>
            <span className={`${navItemSpan}`}>
              <HomeIcon />
            </span>
            Home
          </Link>
        </li>
        <li>
          <Link to="/certifications" className={navItemClassName}>
            <span className={`${navItemSpan}`}>
              <CertificationsIcon />
            </span>
            Certifications
          </Link>
        </li>
        <li>
          <Link to="/about" className={navItemClassName}>
            <span className={`${navItemSpan}`}>
              <AboutIcon />
            </span>
            About
          </Link>
        </li>
        {loggedIn && profileElement}

        {(!loggedIn && loginElement) || logoutElement}
      </ul>
    </nav>
  );
};
