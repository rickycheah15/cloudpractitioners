import { useEffect, useState, FormEvent } from "react";
import { ChangeEvent } from "react";
import { useAppSelector } from "../../app/hooks";
import { usePatchUserMutation } from "../../app/apiSlice";
import { RoundXIcon } from "../../common/svg";
import { containsSpecialChars } from "../../common/helpers";

export const UserDetailsForm = ({
  currentTitle,
  linkedInName,
  closeForm,
}: {
  currentTitle: string;
  linkedInName: string;
  closeForm: () => void;
}) => {
  const [stateInput, setStateInput] = useState({
    // both initiated with ""
    role: currentTitle,
    linkedIn: linkedInName,
  });

  const [submitDisabled, setSubmitDisabled] = useState(true);
  //   console.log(submitDisabled);

  //   const [showForm, setShowForm] = useState(false); // using callback from UserDetails
  const [message, setMessage] = useState("");
  const [patchUserDetails, { data, isLoading, error, isSuccess }] =
    usePatchUserMutation();
  console.log(data, error, isLoading, isSuccess);

  const onInputElementChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: (typeof stateInput)[keyof typeof stateInput] =
      event.target.value;
    setStateInput({ ...stateInput, [event.target.name]: value });
    console.log(event.target.name, value);
  };

  useEffect(() => {
    console.log("User Form useEffect...");
    let enableButton = true; // this has to be true first, so any false can override it.
    Object.values(stateInput).forEach((input) =>
      // is 3 sufficient?
      input.length < 4 && input.length !== 0 ? (enableButton = false) : null
    );
    setSubmitDisabled(!enableButton);

    if (error) {
      setMessage("An error has occured!");
    }
  }, [stateInput, setMessage, error]);

  const checkValidInput = () => {
    if (containsSpecialChars(stateInput.role)) {
      setMessage("Please remove any special characters from Role input field.");
      return false;
    }
    if (containsSpecialChars(stateInput.linkedIn)) {
      setMessage("Please input the LinkedIn username (not URL).");
      return false;
    }
    return true;
  };

  // is getting username from HttpOnnly cookie in apiSlice more secure for submission?
  const username = useAppSelector((state) => state.user.loggedInUser);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(""); // clear out any error message

    // if some fields are blank, this can still return true
    // if one filled in field is bad, and others filled in are OK, will show message
    // so returns true, just submit everything in state including ""  fields because that is to clear/remove info
    if (checkValidInput()) {
      const toBeSubmitted = {
        ...stateInput,
        username: username,
      };

      console.log("submit adding new certification");
      patchUserDetails(toBeSubmitted);
      //   setSubmitDisabled(true);

      //   console.log(toBeSubmitted);
    }
  };

  if (true) {
    return (
      <div className="">
        <h3 className="mt-4 font-semibold">Editing User Details</h3>
        <div className="mt-1 p-3 outline outline-black outline-1.5 rounded-sm w-fit">
          {message !== "" && (
            <div className=" my-1 outline outline-red-500 outline-1.5 rounded-sm flex justify-between items-center p-2 mb-1 ">
              <p className="px-1 w-64">{message}</p>
              <button
                className="button-hover-shadow rounded-full w-8 h-8 "
                onClick={() => setMessage("")}
              >
                <RoundXIcon />
              </button>
            </div>
          )}
          <form className="form p-1" id="userdetails-form" onSubmit={onSubmit}>
            <section className="rounded-md space-y-1 mt-1">
              <legend className="font-medium">Current Role </legend>
              <label className="w-16" htmlFor="role">
                Role:{" "}
              </label>
              <input
                className="button-outline px-1.5 ml-1 w-60"
                type="text"
                id="role"
                name="role"
                onChange={onInputElementChange}
                // if a user detail field is not empty (from database), place it as default when showing the form
                // if field is empty from database, then show a placeholder value
                {...(currentTitle !== ""
                  ? { defaultValue: currentTitle }
                  : { placeholder: "Cloud Practitioner" })}
              />
            </section>
            <section className="rounded-lg space-y-1 mt-1.5">
              <legend className="font-medium">LinkedIn Username</legend>
              <label className="w-16" htmlFor="role">
                Username:{" "}
              </label>
              <input
                className="button-outline ml-1 px-1.5 w-48"
                type="text"
                id="linkedIn"
                name="linkedIn"
                onChange={onInputElementChange}
                // placeholder={stateInput.linkedIn}
                {...(linkedInName !== ""
                  ? { defaultValue: linkedInName }
                  : { placeholder: "rickycheah" })}
              />
            </section>
            <div className="mt-4 mb-3 flex justify-end space-x-3">
              <button
                disabled={submitDisabled}
                className="px-2 py-0.5 button-hover-shadow shadow-lg button-outline bg-blue-400 disabled:bg-gray-300 disabled:border-gray-600 disabled:shadow-none"
                type="submit"
              >
                Submit
              </button>
              <button
                className="px-2 py-0.5 button-hover-shadow button-outline"
                type="button"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  // moved button into user details
  //    else {
  //     return (
  //       <>
  //         {/* {message !== "" && <div className="p-1">{message}</div>} */}
  //         <button
  //           className="button-hover-shadow ml-auto w-6 p-0.5 shrink-0 outline outline-1.5 rounded-md outline-black"
  //           onClick={() => setShowForm(true)}
  //         >
  //           <PencilIcon />
  //         </button>
  //       </>
  //     );
  //   }
};
