import { CertificationItem } from "./CertificationItem";

export const CertificationDisplay = ({
  viewingUser,
  ownProfile,
  showType,
  certificationArray,
}: {
  viewingUser: boolean; //viewing a user along with their certificates, so don't need show username
  ownProfile: boolean; //viewing own profile, can add/del certificates and edit profile
  showType: boolean; // viewing all similar certificates under /certiications/dva, can omit type
  certificationArray: [];
}) => {
  const headerCSS = "pl-2 p-1 text-white font-semibold";

  if (certificationArray.length > 0) {
    return (
      <div className="flex flex-col max-w-fit">
        <div className="flex flex-row bg-blue-700 mb-1 p-1 max-w-fit space-x-2">
          <div className={`w-40 ${headerCSS}`}>Date</div>
          {!viewingUser && <div className={`w-48 ${headerCSS}`}>Username</div>}
          {showType && (
            <div className={`w-72 ${headerCSS}`}>Certification Type</div>
          )}
          <div className={`w-40 ${headerCSS}`}>Format</div>
          <div className={`w-28 ${headerCSS}`}>Wait</div>
          <div className={`w-44 ${headerCSS}`}>City</div>
          <div className={`w-48 ${headerCSS}`}>Country</div>
          {ownProfile && <div className="w-6">{""}</div>}
        </div>
        <ul className="flex flex-col max-w-fit">
          {certificationArray.map((certificationInfo: any) => (
            <li key={certificationInfo["sk"]["S"]}>
              <CertificationItem
                viewingUser={viewingUser}
                ownProfile={ownProfile}
                certificationInfo={certificationInfo}
                showType={showType}
              />
              <hr className="h-px border-gray-300" />
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>There are no certificates to show!</div>;
  }
};
