import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef, useContext, useEffect } from "react";
import { AppContext } from "../../../context";
import PropTypes from "prop-types";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorMessage = ({ position }) => {
  const { error, setError } = useContext(AppContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(null);
  };

  useEffect(() => {
    return () => setError(null);
  }, [setError]);

  const anchorOrigin =
    position === "top"
      ? { vertical: "top", horizontal: "center" }
      : { vertical: "bottom", horizontal: "left" };

  return (
    <Snackbar open onClose={handleClose} anchorOrigin={anchorOrigin}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

ErrorMessage.propTypes = {
  position: PropTypes.string.isRequired,
};

export default ErrorMessage;
