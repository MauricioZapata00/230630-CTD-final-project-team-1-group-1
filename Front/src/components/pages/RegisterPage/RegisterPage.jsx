import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { createUser } from "../../../services";
import { AppContext } from "../../../context";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../common/ErrorMessage";
import SuccessMessage from "../../common/SuccessMessage";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const RegisterPage = () => {
  const navigateTo = useNavigate();

  const {success, setSuccess, error, setError } = useContext(AppContext);
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
  });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('')

  const hasError = (name) => {
    const foundError = errors.find((error) => error.name === name);
    return foundError?.message;
  };

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
    console.log(data);
  };

  const handleSubmit = () => {
    const newErrors = [];
    if (data.nombre.trim().length < 3) {
      newErrors.push({
        name: "nombre",
        message: "El nombre debe contener al menos 3 caracteres.",
      });
    }

    if (data.apellido.trim().length < 3) {
      newErrors.push({
        name: "apellido",
        message: "El apellido debe contener al menos 3 caracteres.",
      });
    }

    if (!data.email.match(emailRegex)) {
      newErrors.push({
        name: "email",
        message: "Email inválido.",
      });
    }

    if (data.contrasena.trim().length < 8) {
      newErrors.push({
        name: "password",
        message: "La contraseña debe contener al menos 8 caracteres.",
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    setSending(true);
    createUser({ ...data, rolName: "USER" })
      .then((response) => {
        setMessage(response.data);
        console.log(response.data);
        setShowModal(true);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        console.log(error);
        setError(errorMsg || "Ha ocurrido un error.");
      })
      .finally(() => setSending(false));
  };
 
  const handleCloseModal = () => {
    setShowModal(false);
    setMessage('')
  };

  return (
    <div className="register-page">
      <div className="register-page__form-container">
        <h1>Formulario de registro</h1>
        <div className="form-control">
          <TextField
            error={!!hasError("nombre")}
            name="nombre"
            label="Ingrese su nombre"
            variant="outlined"
            fullWidth={true}
            value={data.nombre}
            onChange={handleChange}
          />
          {!!hasError("nombre") && (
            <p className="error">{hasError("nombre")}</p>
          )}
        </div>
        <div className="form-control">
          <TextField
            error={!!hasError("apellido")}
            name="apellido"
            label="Ingrese su apellido"
            variant="outlined"
            fullWidth={true}
            value={data.apellido}
            onChange={handleChange}
          />
          {!!hasError("apellido") && (
            <p className="error">{hasError("apellido")}</p>
          )}
        </div>
        <div className="form-control">
          <TextField
            error={!!hasError("email")}
            name="email"
            label="Ingrese su email"
            variant="outlined"
            fullWidth={true}
            value={data.email}
            onChange={handleChange}
          />
          {!!hasError("email") && <p className="error">{hasError("email")}</p>}
        </div>
        <div className="form-control">
          <TextField
            error={!!hasError("password")}
            name="contrasena"
            label="Ingrese su contraseña"
            variant="outlined"
            fullWidth={true}
            value={data.contrasena}
            onChange={handleChange}
            type="password"
          />
          {!!hasError("password") && (
            <p className="error">{hasError("password")}</p>
          )}
        </div>
        <LoadingButton
          onClick={handleSubmit}
          loading={sending}
          variant="contained"
          disabled={sending}
        >
          <span>Crear Cuenta</span>
        </LoadingButton>
        <p className="register-page__form-container__link">
          ¿Ya tienes una cuenta? <Link to={`/ingreso`}>Inicia Sesión</Link>
        </p>
      </div>
      {showModal && (
        <Dialog open={showModal} onClose={handleCloseModal}>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cerrar</Button>
          </DialogActions>
          <div className="calification">
            <p style={{ fontWeight: "600" }}>¡Listo! Revisa tu correo</p>
            <div>
              <p>{message}</p>        
            </div>
          </div>
          <DialogActions style={{justifyContent: 'center', marginBottom: '1rem'}} >
            <Button variant="contained" onClick={handleCloseModal} >OK</Button>
          </DialogActions>
        </Dialog>
      )}
      {error && <ErrorMessage />}
    </div>
  );
};

export default RegisterPage;
