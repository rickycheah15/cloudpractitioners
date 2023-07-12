import { Navigate } from "react-router-dom";
import { useState } from "react";
import { CertificationForm } from "../certifications/CertificationForm";
import { useGetUserQuery } from "../../app/apiSlice";
import { CertificationDisplay } from "../certifications/CertificationDisplay";
import linkedInIcon from "../../assets/LI-Logo.png";
import { UserDetailsForm } from "./UserDetailsForm";
import { PencilIcon, PlusIcon } from "../../common/svg";

export interface UserObject {
  username: string;
}

export const UserDetails = ({
  viewOwnProfile,
  username,
}: {
  viewOwnProfile: boolean;
  username: string;
}) => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [showCertificationForm, setShowCertificationForm] = useState(false);

  const { data, isLoading, isFetching, error } = useGetUserQuery(username);

  if (isLoading || isFetching) {
    return (
      <div className="my-4 mx-4 animate-pulse">Loading user details...</div>
    );
  } else if (data) {
    if (data.length >= 1) {
      const userData = data[0];
      const userName = userData["pk"]["S"];

      // need to have "" even if info is not available for when user edits form
      // UserDetailsForm checks for "" and uses placeholder instead of defaultvalue
      const currentTitle: string =
        userData.role?.S !== undefined ? userData.role.S : "";
      const linkedInName: string =
        userData.linkedIn?.S !== undefined ? userData.linkedIn.S : "";
      let linkedInLink = "";
      if (linkedInName !== "") {
        linkedInLink = `https://linkedin.com/in/${linkedInName}`;
      }

      // Todo: refactor userContent below into a new component.
      // if storing JSX in array, need to index the array when using; userContent[0]
      const userContent = [
        <div className="flex space-x-5 items-center">
          <div>
            <span className="font-semibold">Username: </span> {userName}
          </div>
          {currentTitle !== "" && (
            <div>
              <span className="font-semibold">Current Role: </span>
              {currentTitle}
            </div>
          )}
          {linkedInLink !== "" && (
            <div className="w-fit">
              {/* opens LinkedIn in new window */}
              <a href={linkedInLink} target="_blank" rel="noopener noreferrer">
                <img
                  className="button-hover-shadow object-scale-down h-6 my-1 p-1 button-outline rounded-md"
                  src={linkedInIcon}
                  alt="LinkedIn Icon"
                ></img>
              </a>
            </div>
          )}
          {viewOwnProfile && !showUserForm && (
            <button
              className="button-hover-shadow ml-auto w-6 p-0.5 shrink-0 button-outline rounded-md"
              onClick={() => setShowUserForm(true)}
              aria-label="Edit User Details"
            >
              <PencilIcon />
            </button>
          )}
        </div>,
      ];

      return (
        <>
          <section className="mt-3 mb-2 mx-5 rounded-md p-3 text-lg">
            {userContent[0]}

            {viewOwnProfile && showUserForm && (
              <>
                <hr className="mt-6 h-px border-gray-300" />
                <UserDetailsForm
                  currentTitle={currentTitle}
                  linkedInName={linkedInName}
                  closeForm={() => setShowUserForm(false)}
                />
              </>
            )}

            {viewOwnProfile && showCertificationForm && (
              <>
                <hr className="mt-6 h-px border-gray-300" />
                <CertificationForm
                  closeForm={() => setShowCertificationForm(false)}
                />
              </>
            )}

            <hr className="mt-6 h-0.5 border-gray-300" />
          </section>

          <section className="mx-3">
            <div className="mb-2 mx-5 font-semibold">
              {(viewOwnProfile && data.length >= 2 && (
                <h3>List of my certifications: </h3>
              )) ||
                (data.length >= 2 && <h3>List of user certifications: </h3>)}
              {data.length < 2 && <h3>There are no certifications. </h3>}
            </div>

            {data.length >= 2 && (
              <div className="mb-3 mx-4">
                <CertificationDisplay
                  viewingUser={true}
                  ownProfile={viewOwnProfile}
                  showType={true}
                  certificationArray={data.slice(1)}
                />
              </div>
            )}
            <section className="my-2 mx-5">
              {viewOwnProfile && !showCertificationForm && (
                <button
                  className="button-hover-shadow ml-auto w-6 p-0.5 shrink-0 button-outline"
                  onClick={() => setShowCertificationForm(true)}
                  aria-label="Add A Certification"
                >
                  {/* Add a Certification */}
                  <PlusIcon />
                </button>
              )}
            </section>
          </section>
        </>
      );
    } else if (error) {
      return <div>{JSON.stringify(error)}</div>;
    }
  }
  // has username, but got empty [], viewing own profile but expired token
  // changed username in cookie, but tries to use /profile url
  // this should be <navigate> to login again
  if (viewOwnProfile) {
    return <Navigate to="/login" />;
    // return <div>{username}</div>;
  }
  // manually using /user/{username} URL but gets empty []
  // no such user in database
  return <Navigate to="/" />;
};

/* Vanilla Fetch - replaced by RTK Query */
// async function fetchUser() {
//   const response = await fetch(
//     `https://cloudpractitioners.com/api/user/${userObject.username}`,
//     { method: "GET", credentials: "include" }
//   );
//   const data = await response.json();
//   console.log(response);
//   console.log(data);
// }
// fetchUser();
