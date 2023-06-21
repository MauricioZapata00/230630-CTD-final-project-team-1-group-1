import { Avatar, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo1 from "../../../assets/Imagen2.png";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import PropTypes from "prop-types";
import SettingsIcon from "@mui/icons-material/Settings";
import LoginIcon from "@mui/icons-material/Login";
import PopupUser from "../../common/PopupUser";

const Header = ({ admin = false }) => {
  const navigateTo = useNavigate();

  const { logedUser, setLogedUser } = useContext(AppContext);
  const [showPopup, setShowPopup] = useState(false);

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
    localStorage.removeItem("logedUser");
    setLogedUser(false);
    navigateTo("/");
  };

  useEffect(() => {
    const logedUserData = localStorage.getItem("logedUser");
    if (logedUserData) {
      const userData = JSON.parse(logedUserData);
      setLogedUser(userData);
      if (admin && userData?.rolName !== "ADMIN") {
        navigateTo("/");
      }
    }
  }, [admin, navigateTo, setLogedUser]);
  

  const handleUsernameClick = () => {
    setShowPopup(!showPopup);
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
        {!admin && logedUser?.rolName === "ADMIN" && (
          <div>
            <Button onClick={handleGoToAdmin}>Administrar</Button>
          </div>
        )}
        {!logedUser ? (
          !admin && (
            <div className="header__buttons">
              <Button variant="text" onClick={handleRegisterClick}>
                Crear Cuenta
              </Button>
              <Button variant="text" onClick={handleLoginClick}>
                Iniciar Sesión
              </Button>
            </div>
          )
        ) : (
          <div className="header__user-info">
            <Avatar sx={{ bgcolor: "#67D671" }}>{logedUser.avatar}</Avatar>
            <span onClick={handleUsernameClick} style={{ cursor: "pointer" }}>
              {logedUser.nombre} {logedUser.apellido}
            </span>         
            <IconButton onClick={handleLogOut} aria-label="cerrar sesión">
              <LoginIcon />
            </IconButton>
            {showPopup && <PopupUser />} 
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
