import { useContext } from "react";
import { AppContext } from "../../../context";
import { Input } from "@mui/material";

const UserPage = () => {
  const { logedUser } = useContext(AppContext);

  if (!logedUser) {
    return null;
  }

  const { nombre, apellido, email } = logedUser;
  return (
    <div className="user-page">
      <div className="user-page__info">
        <h2>MI PERFIL</h2>
        <p>
          <label>Nombre</label> <Input fullWidth type="text" value={nombre} />
        </p>
        <p>
          <label>Apellido</label>{" "}
          <Input fullWidth type="text" value={apellido} />
        </p>
        <p>
          <label>Email</label> <Input fullWidth type="text" value={email} />
        </p>
      </div>
    </div>
  );
};

export default UserPage;
