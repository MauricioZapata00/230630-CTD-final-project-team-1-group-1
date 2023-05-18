import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
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
    // navigateTo("/registro");
    setLogedUser({ userName: "admin", isAdmin: true });
  };

  const handleLoginClick = () => {
    // navigateTo("/ingreso");
    setLogedUser({ userName: "admin", isAdmin: true });
  };

  const handleAddProduct = () => {
    setIsOpenDialog(true);
  };

  return (
    <>
      <div className="header">
        <div onClick={handleLogoClick} className="header__logo">
          <img height="50px" src={Logo} alt="logo" />
          Servicios de Caterig
        </div>
        {logedUser && logedUser.isAdmin && (
          <div>
            <Button
              variant="outlined"
              sx={{ background: "white" }}
              onClick={handleAddProduct}
            >
              Cargar producto
            </Button>
          </div>
        )}
        {!logedUser ? (
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
        ) : (
          <div className="header__user-info">
            <Avatar sx={{ bgcolor: "#67D671" }}>A</Avatar>
            <span>{logedUser.userName}</span>
          </div>
        )}
      </div>
      <InputProduct
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />
    </>
  );
};

export default Header;
