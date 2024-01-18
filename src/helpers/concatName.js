const concatName = (familyName, givenName) => {
  if (typeof givenName == "undefined") return familyName;
  if (typeof familyName == "undefined") return givenName;
  return familyName + " " + givenName;
};

export default concatName;
