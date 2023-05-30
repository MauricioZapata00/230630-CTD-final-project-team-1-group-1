import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context";

const LoginPage = () => {
  const navigateTo = useNavigate();
  const {setLogedUser } = useContext(AppContext);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
}

  function handleSubmit(e) {
      e.preventDefault();
      const cleanEmail = email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (password.length > 0 && emailRegex.test(email)) {
          setError(`Bienvenido, te estamos redirigiendo`);
          navigateTo("/")
          setLogedUser({ userName: "admin", isAdmin: true })
      } else {
          console.log("The password is invalid.");
          console.log(`The email address ${email} is invalid.`);
          setError("Por favor verifique su información nuevamente")
      }
  }

  return (
      <section className='section' >
          <h3>TE DAMOS LA BIENVENIDA</h3>
          <h4>Disfrutá de los beneficios al inciar sesión</h4>
          <form onSubmit={handleSubmit}>
              <input
                  value={email}
                  onChange={handleChangeEmail}
                  placeholder="Ingrese su correo electrónico"
              />
              <input
                  value={password}
                  onChange={handleChangePassword}
                  placeholder="Ingrese su contraseña"
              />
              <div>{error}</div>
              <LoadingButton variant="contained" type="submit">Iniciar sesión</LoadingButton>
          </form>
          
      </section>
  )
};

export default LoginPage;
