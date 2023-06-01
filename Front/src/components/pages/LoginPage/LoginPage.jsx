import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context";
import { validateUser } from "../../../services";
import UserPage from "../UserPage/UserPage";
import { TextField } from "@mui/material";
import ErrorMessage from "../../common/ErrorMessage";

const LoginPage = () => {
  const navigateTo = useNavigate();
  const { setLogedUser, error, setError } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = [];

    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(cleanEmail) || !contrasena) {
      newErrors.push({
        name: "email",
        message: "Email inválido.",
      });
    }

    if (contrasena.length < 8) {
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

    try {
      const response = await validateUser({ email, contrasena });

      if (response.status === 200) {
        console.log(response.data);
        setUserData(response.data)
        navigateTo("/")
        const firstLetter = email.charAt(0).toUpperCase()
        const username = email.split("@")[0]
        const logedUser = {
            userName: username,
            avatar: firstLetter,
            isAdmin: true,
          };
    
          setLogedUser(logedUser);
          localStorage.setItem("logedUser", JSON.stringify(logedUser));
          setSending(false);
    
        console.log('Inicio de sesión exitoso');
      } else {
        setError("Por favor, verifique que el email y contraseña ingresados sean correctos")
        console.log('Credenciales inválidas');
      }
    } catch (error) {
      setError("Email y/o contraseña incorrectos");
      setSending(false);
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <section className="login-page">
      <div className="login-page__form-container">
        <h3>TE DAMOS LA BIENVENIDA</h3>
        <h4>Disfrutá de los beneficios al inciar sesión</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <TextField
              error={!!hasError("email")}
              name="email"
              label="Ingrese su email"
              variant="outlined"
              fullWidth={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!!hasError("email") && (
              <p className="error">{hasError("email")}</p>
            )}
          </div>
          <div className="form-control">
            <TextField
              error={!!hasError("password")}
              name="contrasena"
              label="Ingrese su contraseña"
              variant="outlined"
              fullWidth={true}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
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
            <span>Ingresar</span>
          </LoadingButton>
        </form>
        {error && <ErrorMessage />}
      </div>
    </section>
  );
};

export default LoginPage;
