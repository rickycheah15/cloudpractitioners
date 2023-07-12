import { useGetCertificationsQuery } from "../../app/apiSlice";
import { CertificationDisplay } from "./CertificationDisplay";

export const CertificationList = (props: {
  certificationtype: string;
  fullCertificationName: string;
}) => {
  // hooks can't be called conditionally
  const { data, isLoading, isFetching, error } = useGetCertificationsQuery(
    props.certificationtype
  );
  if (isLoading || isFetching) {
    return (
      <div className="my-4 mx-4 animate-pulse">Loading certifications...</div>
    );
  } else if (data) {
    if (data.length !== 0) {
      return (
        <div className="m-2">
          <h1 className="text-lg my-4 ml-3">
            <span className="font-semibold text-lg my-2 ml-3 text-gray-700  p-1 w-fit ">
              {props.fullCertificationName}
            </span>{" "}
            certifications recently acquired:
          </h1>
          <div className="mx-4">
            <CertificationDisplay
              viewingUser={false}
              ownProfile={false}
              showType={false}
              certificationArray={data}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="m-2">
          <h2 className="text-lg my-4 ml-3">
            There are currently no
            <span className="font-extrabold text-lg my-2 mx-0.5 text-gray-700 rounded-md p-1 w-fit ">
              {props.fullCertificationName}
            </span>
            certifications.
          </h2>
        </div>
      );
    }
  } else if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return <div>A mysterious error has occured. Sorry.</div>;
};
