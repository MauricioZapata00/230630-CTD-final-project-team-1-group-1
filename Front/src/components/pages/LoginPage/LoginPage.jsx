import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context";
import { validateUser } from "../../../services";
import UserPage from "../UserPage/UserPage";

const LoginPage = () => {
  const navigateTo = useNavigate();
  const {setLogedUser } = useContext(AppContext);
  
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const {setUserData } = useContext(AppContext);

  const handleSubmit = async(e) =>{
      e.preventDefault();

      const cleanEmail = email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email) || !contrasena) {
        setError('Por favor, ingresa el email y la contraseña');
        return;
      }
    try {
      const response = await validateUser({ email, contrasena });

      if (response.status === 200) {
        console.log(response.data);
        setUserData(response.data)
        navigateTo("/")
        const firstLetter = email.charAt(0).toUpperCase()
        const username = email.split("@")[0]
        setLogedUser({ userName: username, avatar:firstLetter, isAdmin: true })
        console.log('Inicio de sesión exitoso');
      } else {
        setError("Por favor, verifique que el email y contraseña ingresados sean correctos")
        console.log('Credenciales inválidas');
      }
    } catch (error) {
      setError("Por favor, verifique que el email y contraseña ingresados sean correctos")
      console.error('Error al iniciar sesión', error);
    }
      
  }

  return (
      <section className='section' >
          <h3>TE DAMOS LA BIENVENIDA</h3>
          <h4>Disfrutá de los beneficios al inciar sesión</h4>
          <form onSubmit={handleSubmit}>
              <input
                type="email"                
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su correo electrónico"
              />
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Ingrese su contraseña"
              />
              <div>{error}</div>
              <LoadingButton variant="contained" type="submit">Iniciar sesión</LoadingButton>
          </form>
          
      </section>
  )
};

export default LoginPage;
