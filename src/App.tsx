import cloud from "./assets/cloud.png";
import { Login } from "./features/auth/Login";
import { NavView } from "./features/ui/NavView";
import { CertificationTypes } from "./features/certifications/CertificationTypes";
import { CertificationType } from "./features/certifications/CertificationType";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { CurrentUserProfile } from "./features/user/CurrentUserProfile";
import { OtherUserProfile } from "./features/user/OtherUserProfile";
import { Logout } from "./features/auth/Logout";
import { getCookie } from "./common/helpers";
import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";
import { userLoggedIn } from "./features/user/userSlice";
import { Home } from "./features/general/Home";
import { About } from "./features/general/About";

function App() {
  console.log("render: App");
  const dispatch = useAppDispatch();

  // we are running this check here, because /login opens Cognito Hosted UI in the current window and
  // authenticated user will be redirected to "/" and so useEffect will run.
  const username = getCookie("current_user");
  useEffect(() => {
    if (username) {
      // this sets loggedIn to {true} and loggedInUser to {username in store}
      dispatch(userLoggedIn(username));
    }
  }, [dispatch, username]);
  return (
    <>
      <BrowserRouter>
        <header className="flex justify-between p-2 bg-gradient-to-b from-blue-700 to-blue-400 ">
          <Link to="/" className="">
            <nav className="flex items-center">
              <figure>
                <img
                  src={cloud}
                  className="object-scale-down w-20 mx-4"
                  alt="Logo: A cloud"
                ></img>
              </figure>
              <div>
                <h1 className="text-black text-4xl font-bold" tabIndex={0}>
                  Cloud Practitioners
                </h1>
                <h2 className="text-black text-base" tabIndex={0}>
                  Connecting certified and aspiring cloud professionals.
                </h2>
              </div>
            </nav>
          </Link>
          <div className="flex items-center">
            <NavView />
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<CurrentUserProfile />} />
          {/* path to /user just shows my profile */}
          <Route path="/user" element={<CurrentUserProfile />} />
          <Route path="/user/:username" element={<OtherUserProfile />} />
          {/* only can add or edit in profile view */}
          <Route path="/certifications" element={<CertificationTypes />} />
          <Route
            path="/certifications/:certificationtype"
            element={<CertificationType />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
