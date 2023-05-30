import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#0D8B48",
          },
          secondary: {
            main: "#36b29a",
          },
          error: {
            main: "#e25a5a",
          },
          success: {
            main: "#39995f",
          },
          info: {
            main: "#FFFFFF",
          },
          low: {
            main: "#eb6f0e",
          },
          medium: {
            main: "#df8932",
          },
          high: {
            main: "#36b29a",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => useContext(ThemeContext);
