import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";

const Header = () => {
  const navigateTo = useNavigate();

  const handleLogoClick = () => {
    navigateTo("/");
  };

  const handleRegisterClick = () => {
    navigateTo("/registro");
  };

  const handleLoginClick = () => {
    navigateTo("/ingreso");
  };

  return (
    <div className="header">
      <div onClick={handleLogoClick} className="header__logo">
        <img height="50px" src={Logo} alt="logo" />
        Servicios de Caterig
      </div>
      <div className="header__buttons">
        <Button
          variant="outlined"
          sx={{ background: "white" }}
          onClick={handleRegisterClick}
        >
          Crear Cuenta
        </Button>
        <Button
          variant="outlined"
          sx={{ background: "white" }}
          onClick={handleLoginClick}
        >
          Iniciar Sesión
        </Button>
      </div>
    </div>
  );
};

export default Header;
