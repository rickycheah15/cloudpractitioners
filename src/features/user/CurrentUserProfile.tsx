import { UserDetails } from "./UserDetails";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

export const CurrentUserProfile = () => {
  const username = useAppSelector((state) => state.user.loggedInUser);

  // check if username is empty, ask to login
  if (!username) {
    return <Navigate to="/login" />;
  } else {
    return (
      <>
        <UserDetails viewOwnProfile username={username!} />
      </>
    );
  }
};

// MOVED TO App.tsx
// if a logged-in user enters the URL manually, e.g. to /user/googleuser0515, redux store will be cleared!
// user would appear to not be logged in anymore, even if the current_user cookie is still there
// MOVED TO APP
// console.log("render: CurrentUserProfileView");
// const dispatch = useAppDispatch();

// const username = getCookie("current_user");
// // const [username, setUsername] = useState(getCookie("current_user"));
// // do we need useEffect here?
// useEffect(() => {
//   // const userIDCookie = getCookie("userid");
//   // console.log(userIDCookie);
//   if (username) {
//     dispatch(userLoggedIn(username));
//   }
// }, [dispatch, username]);

// check from store if user info is stored'
// if not, use api call to check for current_user cookie, then fetch user data and store it
// cookie path needs to be / for now to be sent each time

// const address =
//   "https://auth.cloudpractitioners.com/login?client_id=31islttts6kiol55v8lhm2q1uo&response_type=code&scope=email+openid&redirect_uri=https%3A%2F%2Fcloudpractitioners.com%2Foauth2%2Fcallback";
