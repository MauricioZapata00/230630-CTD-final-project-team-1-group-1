import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
//import Logo from "../../../assets/logo.png";
import Logo1 from "../../../assets/Imagen2.png";
import { useContext, useState } from "react";
import { AppContext } from "../../../context";
import InputProduct from "../../forms/InputProduct/InputProduct";

const Header = () => {
  const navigateTo = useNavigate();

  const { logedUser, setLogedUser } = useContext(AppContext);

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleLogoClick = () => {
    navigateTo("/");
  };

  const handleRegisterClick = () => {
    navigateTo("/registro");
  };

  const handleLoginClick = () => {
    // navigateTo("/ingreso");
    setLogedUser({ userName: "admin", isAdmin: true });
  };

  const handleGoToAdmin = () => {
    navigateTo("/admin");
  };

  return (
    <>
      <div className="header">
        <div onClick={handleLogoClick} className="header__logo">
          <img height="50px" src={Logo1} alt="logo" />
          Digital Catering
        </div>
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
            {logedUser.isAdmin && (
              <div>
                <Button variant="contained" onClick={handleGoToAdmin}>
                  Administrar
                </Button>
              </div>
            )}
            <Avatar sx={{ bgcolor: "#67D671" }}>A</Avatar>
            <span>{logedUser.userName}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
