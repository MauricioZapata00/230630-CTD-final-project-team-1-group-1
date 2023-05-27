import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef, useContext, useEffect } from "react";
import { AppContext } from "../../../context";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SuccessMessage = () => {
  const { success, setSuccess } = useContext(AppContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(null);
  };

  useEffect(() => {
    return () => setSuccess(null);
  }, [setSuccess]);

  return (
    <Snackbar open autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {success}
      </Alert>
    </Snackbar>
  );
};

export default SuccessMessage;
