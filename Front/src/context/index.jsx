import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [logedUser, setLogedUser] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState(0);

  const contextValue = {
    logedUser,
    setLogedUser,
    success,
    setSuccess,
    error,
    setError,
    rating,
    setRating
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
