import { useParams, Navigate } from "react-router-dom";
import { certificationDict } from "../../common/helpers";
import { CertificationList } from "./CertificationList";

export const CertificationType = () => {
  const { certificationtype } = useParams();
  console.log(certificationtype);
  // check if :certificationtype (from url) matches one in the dictionary
  const fullCertificationName = certificationDict[certificationtype!];

  if (fullCertificationName) {
    return (
      <CertificationList
        certificationtype={certificationtype!}
        fullCertificationName={fullCertificationName}
      />
    );
  }
  return <Navigate to="/certifications" />;
};
