import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { createUser } from "../../../services";
import { AppContext } from "../../../context";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const RegisterPage = () => {
  const navigateTo = useNavigate();

  const { setSuccess, setError } = useContext(AppContext);
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
  });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState([]);

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
      .then(() => {
        setSuccess("La cuenta se creó correctamente");
        navigateTo("/ingreso");
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      })
      .finally(() => setSending(false));
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
        <p className="register-page__form-container__link">¿Ya tienes una cuenta? <Link to={`/ingreso`}>Inicia Sesión</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
