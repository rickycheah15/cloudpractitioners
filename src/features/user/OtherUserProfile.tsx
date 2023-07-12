import { useParams } from "react-router-dom";
import { UserDetails } from "./UserDetails";
// import { UserObject } from "./UserDetails";

export const OtherUserProfile = () => {
  const { username } = useParams();
  console.log(username);

  return (
    <>
      <UserDetails viewOwnProfile={false} username={username!} />
    </>
  );

  // todo:
  // useSelector and check if viewing own profile? true, add Edit Buttons
};
