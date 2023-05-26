import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { createUser } from "../../../services";
import ErrorMessage from "../../common/ErrorMessage";
import SuccessMessage from "../../common/SuccessMessage";
import { AppContext } from "../../../context";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const RegisterPage = () => {
  const { success, setSuccess, error, setError } = useContext(AppContext);
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
  });
  const [sending, setSending] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
    console.log(data);
  };

  const handleSubmit = () => {
    if (data.nombre.trim().length < 5 || !data.email.match(emailRegex)) {
      setErrorMessage("Por favor verifique su información nuevamente");
      return;
    } else {
      setSending(true);
      setErrorMessage(null);
      createUser(data)
        .then((response) => {
          setSuccess(response.data);
        })
        .catch((error) => {
          const errorMsg =
            error?.response?.data?.description ||
            "Ha ocurrido un error en el servidor";
          setError(errorMsg);
        })
        .finally(() => setSending(false));
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__form-container">
        <h1>Formulario de registro</h1>
        <div className="form-control">
          <TextField
            name="nombre"
            label="Ingrese su nombre"
            variant="outlined"
            fullWidth={true}
            value={data.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <TextField
            name="apellido"
            label="Ingrese su apellido"
            variant="outlined"
            fullWidth={true}
            value={data.apellido}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <TextField
            name="email"
            label="Ingrese su email"
            variant="outlined"
            fullWidth={true}
            value={data.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <TextField
            name="contrasena"
            label="Ingrese su contraseña"
            variant="outlined"
            fullWidth={true}
            value={data.contrasena}
            onChange={handleChange}
          />
        </div>
        <LoadingButton
          onClick={handleSubmit}
          loading={sending}
          variant="contained"
          disabled={sending}
        >
          <span>Crear Cuenta</span>
        </LoadingButton>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
      {success && <SuccessMessage />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default RegisterPage;
