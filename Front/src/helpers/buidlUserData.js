export const buildUserData = (userDto) => {
  let userData = {};
  const properties = userDto.replace("{", "").replace("}", "").split(", ");
  properties.forEach((prop) => {
    const keyValue = prop.replace('"', "").replace("'", "").split("=");
    const key = keyValue[0];
    const value = key === "id" ? keyValue[1] : keyValue[1].slice(0, -1);
    userData[key] = value;
  });
  return userData;
};
