import { useNavigate } from "react-router-dom";

const PopupUser = () => {
  const navigateTo = useNavigate();

  const handleMisDatos = () => {
    navigateTo("/usuario");
  };

  const handleMisReservas = () => {
    navigateTo("/reservas");
  };

  return (
    <div className="popup">
      <p onClick={handleMisDatos}>Mis datos</p>
      <p onClick={handleMisReservas}>Mis reservas</p>
    </div>
  );
};

export default PopupUser;
