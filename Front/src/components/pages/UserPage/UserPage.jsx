import { useContext } from "react";
import { AppContext } from "../../../context";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const { userData } = useContext(AppContext);
  const navigateTo = useNavigate();

    if (!userData) {
        navigateTo("/");
      }    

    console.log(userData);
    const { nombre, apellido, email } = userData;
    return (
        <div className="user-page">
            <div className="user-page__info">
                <h2>MI PERFIL</h2>
                <p><label >Nombre</label> <Input fullWidth type="text" value={nombre} /></p>
                <p><label >Apellido</label> <Input fullWidth type="text" value={apellido} /></p>
                <p><label >Email</label> <Input fullWidth type="text" value={email} /></p>
            </div>
        </div>
    )
}

export default UserPage
