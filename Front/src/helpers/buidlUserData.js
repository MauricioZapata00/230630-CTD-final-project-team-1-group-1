export const buildUserData = (userDto) => {
  let userData = {};
  const properties = userDto.replace("{", "").replace("}", "").split(", ");
  properties.forEach((prop) => {
    const keyValue = prop.replace('"', "").replace("'", "").split("=");
    userData[keyValue[0]] = keyValue[1].slice(0, -1);
  });
  return userData;
};
