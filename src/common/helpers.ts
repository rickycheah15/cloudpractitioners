export const getCookie = (name: string) => {
  // Split cookie string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");
  // Loop through the array elements
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");
    /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
    if (name === cookiePair[0].trim()) {
      // Decode the cookie value and return
      return decodeURIComponent(cookiePair[1]);
    }
  }
  // Return null if not found
  return null;
};

// removed dash \-, eg: for full-stack
export const containsSpecialChars = (inputStr: string) => {
  const specialChars = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
  return specialChars.test(inputStr);
};

export const certificationDict: { [abbreviation: string]: string } = {
  clf: "Cloud Practitioner",
  saa: "Solutions Architect - Associate",
  dva: "Developer - Associate",
  soa: "SysOps Administrator - Associate",
  dop: "DevOps Engineer - Professional",
  sap: "Solutions Architect - Professional",
  ans: "Advanced Networking - Specialty",
  scs: "Security - Specialty",
  mls: "Machine Learning - Specialty",
  dbs: "Database - Specialty",
  das: "Data Analytics - Specialty",
  pas: "SAP on AWS - Specialty",
};
