import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo1 from "../../../assets/Imagen2.png";
import { useContext } from "react";
import { AppContext } from "../../../context";
import PropTypes from "prop-types";
import SettingsIcon from "@mui/icons-material/Settings";

const Header = ({ admin = false }) => {
  const navigateTo = useNavigate();

  const { logedUser, setLogedUser } = useContext(AppContext);

  const handleLogoClick = () => {
    !admin ? navigateTo("/") : navigateTo("/admin");
  };

  const handleRegisterClick = () => {
    navigateTo("/registro");
  };

  const handleLoginClick = () => {
    navigateTo("/ingreso");
  };

  const handleGoToAdmin = () => {
    navigateTo("/admin");
  };

  const handleGoToSite = () => {
    navigateTo("/");
  };

  const handleLogOut = () => {
    setLogedUser(false);
  };

  return (
    <>
      <div className="header">
        {!admin ? (
          <div onClick={handleLogoClick} className="header__logo">
            <img height="50px" src={Logo1} alt="logo" />
            Digital Catering
          </div>
        ) : (
          <div onClick={handleLogoClick} className="header__logo">
            <SettingsIcon />
            Administración
          </div>
        )}

        {admin && (
          <div>
            <Button onClick={handleGoToSite}>Ir al Sitio</Button>
          </div>
        )}
        {!admin && (
          <div>
            <Button onClick={handleGoToAdmin}>Administrar</Button>
          </div>
        )}
        {!logedUser ? (
          <div className="header__buttons">
            <Button variant="text" onClick={handleRegisterClick}>
              Crear Cuenta
            </Button>
            <Button variant="text" onClick={handleLoginClick}>
              Iniciar Sesión
            </Button>
          </div>
        ) : (
          <div className="header__user-info">
            <Avatar sx={{ bgcolor: "#67D671" }}>{logedUser.avatar}</Avatar>
            <span>{logedUser.userName}</span>
            <Button onClick={handleLogOut}>Cerrar sesión</Button>
          </div>
        )}
      </div>
    </>
  );
};

Header.propTypes = {
  admin: PropTypes.bool,
};

Header.defaultProps = {
  admin: false,
};

export default Header;
