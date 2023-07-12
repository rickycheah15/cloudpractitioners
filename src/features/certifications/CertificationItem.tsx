import { useDeleteCertificationMutation } from "../../app/apiSlice";
import { certificationDict } from "../../common/helpers";
import { Link } from "react-router-dom";
import { TrashIcon } from "../../common/svg";

export const CertificationItem = ({
  certificationInfo,
  viewingUser,
  ownProfile,
  showType,
}: {
  certificationInfo: any;
  viewingUser: boolean; //viewing a user along with their certificates, so don't need show username
  ownProfile: boolean; //viewing own profile and certificates, have ability to delete certificates
  showType: boolean; // viewing all similar certificates under /certiications/dva, can omit type
}) => {
  // console.log(typeof certificationInfo);
  // console.log(certificationInfo);
  // const username = certificationInfo["pk"]["S"];
  const username = certificationInfo["sk"]["S"].split("#")[2];
  const certTypeShort = certificationInfo["gsi1pk"]["S"];
  const certTypeFull = certificationDict[certTypeShort];
  const city = certificationInfo["city"]["S"];
  const country = certificationInfo["country"]["S"];
  const resultDelay = certificationInfo["delay"]["S"];

  let testFormat;
  let testFormatCSSColor;
  const certInfoBinary = certificationInfo["online"]["S"];
  if (certInfoBinary === "1") {
    testFormat = "Online Proctoring";
    testFormatCSSColor = "";
  } else {
    testFormat = "Test Center";
    testFormatCSSColor = "";
  }

  // splits into ['', '230226', 'googleuser1227'], we want [1]
  const testDate = certificationInfo["sk"]["S"].split("#")[1];
  // console.log(testDate);

  // . is any character, {1,2} is one to two of that character
  const dateComponent = testDate.match(/.{1,2}/g);
  // console.log(dateComponent);

  // Using '-' to separate in Date will the day to be off by 1, use '/' instead
  // without toDateString() returns "Sun Feb 26 2023 00:00:00 GMT-0500 (Eastern Standard Time)"
  const dateString = new Date(
    `20${dateComponent[0]}/${dateComponent[1]}/${dateComponent[2]}`
  ).toDateString();
  // console.log(dateString);

  // Todo: add error catching when fails to delete
  const [deleteCertification, { isLoading }] = useDeleteCertificationMutation();
  // console.log("Delete certificate in progress:", isLoading, isError, isSuccess);
  const onCertificationDelete = () => {
    const userConfirmed = window.confirm("Delete certificate?");
    if (userConfirmed) {
      const certificationSK = certificationInfo["sk"]["S"];
      // console.log(certificationSK);
      deleteCertification(certificationSK);
    } // make sure to send an object in apiSlice, not just certificationInfo["sk"]["S"]
  };

  const linkToUser = (
    <Link
      className="button-hover-shadow button-outline w-48 pl-2 p-1 rounded-md hover:cursor-pointer"
      to={`/user/${username}`}
    >
      {`${username}`}
    </Link>
  );

  const certificateType = (
    // uses short form of certification in URL (saa), but full form (Solutions Architect- Asso)
    // when displayed to user
    <Link
      className="button-hover-shadow button-outline w-72 pl-2 p-1 hover:cursor-pointer"
      to={`/certifications/${certTypeShort}`}
    >
      {certTypeFull}
    </Link>
  );

  const deleteButton = (
    <button
      // when isLoading is true (deleting certificate), no hover color change
      // disables button when loading
      className={`ml-auto w-6 p-0.5 shrink-0 button-outline ${
        !isLoading && "button-hover-shadow"
      }`}
      disabled={isLoading}
      type="button"
      onClick={onCertificationDelete}
      aria-label="Delete this certification"
    >
      {/* {(isLoading && "Deleting") || "X"} */}
      <TrashIcon />
    </button>
  );
  return (
    <div className="flex flex-row items-center my-1 p-1 max-w-fit space-x-2">
      <div className="w-40 pl-2 p-1 rounded-md">{`${dateString}`}</div>
      {!viewingUser && linkToUser}
      {showType && certificateType}
      <div
        className={`w-40 pl-2 rounded-md ${testFormatCSSColor} p-1`}
      >{`${testFormat}`}</div>
      <div className="w-28 pl-2 p-1 rounded-md ">
        {`${resultDelay}`} {resultDelay > 1 ? "days" : "day"}
      </div>
      <div className="w-44 pl-2 p-1 rounded-md ">{`${city}`}</div>
      <div className="w-48 pl-2 p-1 rounded-md ">{`${country}`}</div>
      {/* shows Delete button only if logged-in and viewing own profile */}
      {ownProfile && deleteButton}
    </div>
  );
};
