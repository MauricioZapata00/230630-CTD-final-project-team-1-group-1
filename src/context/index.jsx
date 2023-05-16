import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [logedUser, setLogedUser] = useState(null);

  const contextValue = {
    logedUser,
    setLogedUser,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  //category: PropTypes.shape({
  //image: PropTypes.string.isRequired,

  //})
};

export default AppContextProvider;
