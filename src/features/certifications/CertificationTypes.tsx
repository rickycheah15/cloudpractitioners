import { Link } from "react-router-dom";

export const CertificationTypes = () => {
  const linkClassName = "button-hover-shadow button-outline py-0.5 px-2 w-fit";
  return (
    <div className="mx-7">
      <p className="text-lg font-semibold my-4">Select certification type:</p>
      <ul className="space-y-3.5">
        <li className={linkClassName}>
          <Link to="./clf">Cloud Practitioner</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./saa">Associate - Solutions Architect</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./dva">Associate - Certified Developer</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./soa">Associate - SysOps Administrator</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./dop">Professional - DevOps Engineer</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./sap">Professional - Solutions Architect</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./ans">Specialty - Advanced Networking</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./scs">Specialty - Security</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./mls">Specialty - Machine Learning</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./dbs">Specialty - Database</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./das">Specialty - Data Analytics</Link>
        </li>
        <li className={linkClassName}>
          <Link to="./pas">Specialty - SAP on AWS</Link>
        </li>
      </ul>
    </div>
  );
};
