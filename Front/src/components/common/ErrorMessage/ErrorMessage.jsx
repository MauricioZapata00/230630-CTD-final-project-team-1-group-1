import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef, useContext, useEffect } from "react";
import { AppContext } from "../../../context";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorMessage = () => {
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

  return (
    <Snackbar open autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessage;
