import { useGetUserQuery } from "../../app/apiSlice";
import { CertificationDisplay } from "../certifications/CertificationDisplay";

export const Home = () => {
  const { data, isLoading, isFetching } = useGetUserQuery("frontpage");

  if (isLoading || isFetching) {
    return (
      <div className="m-2 animate-pulse">Loading recent certificates...</div>
    );
  } else if (data) {
    return (
      <div className="m-2">
        <h3 className="my-1 mx-3 p-2 w-fit">
          The home page displays recently submitted certifications on the
          platform. <br></br> You can view a user's profile or explore all
          submitted certifications of a specific type by clicking on the
          corresponding item in the table.
        </h3>
        <h4 className="font-semibold text-lg my-2.5 mx-4 w-fit">
          Recently submitted certifications:
        </h4>
        <section className="mx-4">
          <CertificationDisplay
            viewingUser={false}
            ownProfile={false}
            showType={true}
            certificationArray={data}
          />
        </section>
      </div>
    );
  } else {
    return (
      <div className="m-2 font-semibold text-lg my-2 mx-3 text-gray-600 p-2">
        This is a very strange error, there should be certifications here!
      </div>
    );
  }
};
