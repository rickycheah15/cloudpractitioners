// allows logged in user to add certifications to their profile
import { useState, useEffect, useCallback } from "react";
import { FormEvent, ChangeEvent } from "react";
import { useAddNewCertificationMutation } from "../../app/apiSlice";
import {
  countryOptions,
  certificationOptions,
} from "../../common/selectOptions";
import { getCookie } from "../../common/helpers";
import { RoundXIcon } from "../../common/svg";

export const CertificationForm = ({ closeForm }: { closeForm: () => void }) => {
  const certificationForm = document.getElementById("certification-form")!;

  const resetForm = useCallback(() => {
    if (certificationForm) {
      (certificationForm as HTMLFormElement).reset();
    }
  }, [certificationForm]);

  const [addNewCertification, { data, isLoading, error, isSuccess }] =
    useAddNewCertificationMutation();

  console.log(
    "Adding certificate progress:",
    data,
    error,
    isLoading,
    isSuccess
  );

  const dateToday = new Date();
  const dateThreeYearsAgo = new Date();
  dateThreeYearsAgo.setFullYear(dateToday.getFullYear() - 3); // Certifications only last of 3 years
  const maxDate = dateToday.toISOString().split("T")[0]; // today
  const minDate = dateThreeYearsAgo.toISOString().split("T")[0];

  const [stateInput, setStateInput] = useState({
    test_date: "",
    online: "",
    city: "",
    delay: "",
  });
  const [stateSelect, setStateSelect] = useState({
    country: "",
    type: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const onInputElementChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value: (typeof stateInput)[keyof typeof stateInput] =
      event.target.value;
    setStateInput({ ...stateInput, [event.target.name]: value });
  };

  const onSelectElementChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let value: (typeof stateSelect)[keyof typeof stateSelect] =
      event.target.value;
    setStateSelect({ ...stateSelect, [event.target.name]: value });
  };

  useEffect(() => {
    // console.log("use effect...");
    let enableButton = true;
    Object.values(stateInput).forEach((value) =>
      value === "" ? (enableButton = false) : null
    );
    Object.values(stateSelect).forEach((value) =>
      value === "" ? (enableButton = false) : null
    );
    setSubmitDisabled(!enableButton);

    // all these are not shown because page is refreshed by RTK Query
    // form will be reset anyway
    if (isSuccess) {
      resetForm();
      // setShowForm(false);
      setMessage("Request was successful!");
    }

    if (error) {
      // since JS validation is implemented to ensure no empty field, will get an error from Lambda
      // if a user try to bypass JS // don't really need specific error message because bypass attempt?
      // will also get an error if credentials are expired
      // redirecting to Login again for expired credentials
      // todo! set form values to localstorage for after user logs in again
      // console.log(JSON.stringify(error));
      console.log(error);
      if ("originalStatus" in error) {
        // originalStatus can be set in Lambda, so they are definable
        const errorCode = error["originalStatus"];
        // console.log(error["originalStatus"]);
        // console.log(error["data"]);
        if (errorCode === 200) {
          // return <Navigate to="/login" />;
          setMessage("Please log in again!");
        } else if (errorCode === 400) {
          // data is where the reason for denial set
          // data: "date" is duplicate date,
          // data: "null" is "" field submitted by bypassing JS
          const data = error["data"];
          if (data === "date") {
            setMessage("You already have a certificate with this date!");
          } else if (data === "blank") {
            setMessage("Please make sure all the fields are filled in!");
          }
        } else {
          setMessage("An error occured!");
        }
      } else {
        // catch-all error
        setMessage("An error occured!");
      }
    }
  }, [stateInput, stateSelect, isSuccess, error, resetForm]);

  // disabled out before inputs entered
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(stateInput["test_date"]);
    setMessage(""); // clear out any error message
    // performed checks in useEffect so button can be disabled
    // if (checkValidInput()) {
    // }
    const dateForDB = stateInput["test_date"].replaceAll("-", "").substring(2);
    // console.log(dateForDB);
    const username = getCookie("current_user");
    const toBeSubmitted = {
      ...stateInput,
      test_date: dateForDB,
      ...stateSelect,
      username: username,
    };

    // will get stale state if use stateInput immediately after setStateInput
    // setStateInput({ ...stateInput, test_date: dateforDB });
    // console.log("submit adding new certification");
    addNewCertification(toBeSubmitted);
    // resetForm(); // no needed because RTK will refresh
    // setSubmitDisabled(true);
    // console.log(toBeSubmitted);
  };

  if (true) {
    return (
      <div>
        <h3 className="mt-4 font-semibold">Adding Certification Details</h3>
        <div className="mt-1 p-3 outline outline-black outline-1.5 rounded-sm w-fit">
          {/* Showing error messages and X button. */}
          {message !== "" && (
            <div className="my-1 outline outline-red-500 outline-1.5 rounded-sm flex justify-between items-center p-2 mb-1 ">
              <p className="px-1">{message}</p>
              <button
                // className="rounded-lg bg-red-400 hover:bg-red-500 px-1.5"
                className="button-hover-shadow rounded-full w-8 h-8 "
                onClick={() => setMessage("")}
              >
                <RoundXIcon />
                {/* <TrashIcon /> */}
              </button>
            </div>

            /* Previous implementation of button to reset message */
            // <div className="rounded-lg flex justify-between p-2 mb-2 bg-red-200">
            //   <p className="px-1">{message}</p>
            //   <button
            //     className="rounded-full bg-red-400 hover:bg-red-500 h-7 w-7"
            //     onClick={() => setMessage("")}
            //   >
            //     {/* X */}
            //     <RoundXIcon />
            //   </button>
            // </div>
          )}
          {/* Showing pulsing loading message */}
          {isLoading && (
            <div className="animate-pulse">Things are happening...</div>
          )}
          {/* The actual user input form */}
          <form className="form" id="certification-form" onSubmit={onSubmit}>
            <section className="p-1">
              <legend className="font-medium">
                Which certification was the test for?
              </legend>
              <div>
                <label htmlFor="type">Certification: </label>
                <select
                  className="rounded-md ring-2 ring-black ml-1 px-1.5 py-0.5 max-w-fit mr-2"
                  name="type"
                  id="type"
                  onChange={onSelectElementChange}
                  defaultValue="default"
                >
                  {certificationOptions}
                </select>
              </div>
            </section>

            <section className="p-1">
              <legend className="font-medium mb-0.5">
                When was your test?
              </legend>
              <label htmlFor="test_date">Test date: </label>
              <input
                className="rounded-md ring-2 ring-black ml-1 px-1.5 max-w-fit mr-2"
                type="date"
                id="test_date"
                name="test_date"
                min={minDate}
                max={maxDate}
                onChange={onInputElementChange}
              />
            </section>

            <section className="p-1">
              <legend className="font-medium">
                What was the format of the test?
              </legend>
              <div>
                <input
                  type="radio"
                  id="r1"
                  name="online"
                  value={"0"}
                  // defaultChecked
                  onChange={onInputElementChange}
                />
                <label className="p-0.5 ml-0.5" htmlFor="r1">
                  Test Center
                </label>
              </div>
              <div>
                <input
                  className="p-0.5"
                  type="radio"
                  id="r2"
                  name="online"
                  value={"1"}
                  onChange={onInputElementChange}
                />
                <label className="p-0.5 ml-0.5" htmlFor="r2">
                  Online Proctoring
                </label>
              </div>
            </section>

            <section className="p-1">
              <legend className="font-medium mb-0.5">
                Where was the test taken?
              </legend>
              <label className="w-16" htmlFor="country">
                Country:{" "}
              </label>
              <select
                className="rounded-md ring-2 ring-black ml-1 px-1.5 py-0.5 max-w-fit mr-2"
                name="country"
                id="country"
                onChange={onSelectElementChange}
                defaultValue="default"
              >
                {countryOptions}
              </select>
              <label className="w-16" htmlFor="city">
                City:{" "}
              </label>
              <input
                className="button-outline ml-1 px-1.5 max-w-fit mr-2 w-44"
                type="text"
                id="city"
                name="city"
                onChange={onInputElementChange}
                placeholder={"Pittsburgh"}
              />
            </section>

            <section className="p-1">
              <legend className="font-medium mb-0.5">
                How many days did you wait to get your result?
              </legend>
              <div className="field">
                <label htmlFor="delay">Days: </label>
                <input
                  className="ml-1 px-1.5 mr-2 w-16 rounded-md ring-2 ring-black "
                  type="number"
                  id="delay"
                  name="delay"
                  step="1"
                  min="1"
                  onChange={onInputElementChange}
                />
              </div>
            </section>

            <div className="mt-4 mb-3 mx-3 flex justify-end space-x-3">
              <button
                disabled={submitDisabled}
                className="button-hover-shadow shadow-lg rounded-md button-outline bg-blue-400 px-2 py-0.5 disabled:bg-gray-300 disabled:border-gray-600 disabled:shadow-none"
                type="submit"
              >
                Submit
              </button>

              {/* needs button type otherwise defaults to submit */}
              <button
                className="button-hover-shadow rounded-md button-outline px-2 py-0.5"
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
};

// Moved to userDetails
// else {
//   return (
//     <>
// <div className="my-2 mx-5">
//   {/* {message !== "" && <div className="p-1">{message}</div>} */}
//   <button
//     className="button-hover-shadow ml-auto w-6 p-0.5 shrink-0 outline outline-1.5 rounded-md outline-black"
//     onClick={() => setShowForm(true)}
//   >
//     {/* Add a Certification */}
//     <PlusIcon />
//   </button>
// </div>
//     </>
//   );
// }

/* Commented out, checking done in useEffect */
// Will check in backend as well (lambda)
// const checkValidInput = () => {
// const errorList: string[] = [];
// if (!stateInput.test_date) {
//   console.log("Please provide the date of the test.");
//   errorList.concat("Please provide the date of the test.");
// }
// if (!stateInput.online) {
//   console.log("Please indicate the format of the test.");
//   errorList.concat("Please provide the date of the test.");
// }
// if (!stateInput.city) {
//   console.log(
//     "Please provide the city name where the test was taken, even if Online Proctoring was used."
//   );
// }
// if (!stateInput.delay) {
//   console.log(
//     "Please indicate the number of days you waited for the result to be announced."
//   );
// } else if (parseInt(stateInput.delay) <= 0) {
//   console.log(
//     "Please enter 1 if the result took less than 24 hours to be announced."
//   );
// }

// if (!stateSelect.country) {
//   console.log(
//     "Please provide the country name where the test was taken, even if Online Proctoring was used."
//   );
// }
// if (!stateSelect.type) {
//   console.log("Please choose the certification type.");
// }
// return true;
// };
