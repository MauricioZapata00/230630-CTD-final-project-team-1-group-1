import { useContext, useEffect } from "react";
import { AppContext } from "../../../context";
import { Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
    const { userData, setUserData } = useContext(AppContext);
    const navigateTo = useNavigate();

    

    useEffect(() => {

            const parsedData = JSON.parse(sessionStorage.getItem('userData') || '[]');
           
            setUserData(parsedData);
            console.log(setUserData);
    
    }, []);

    if (!userData) {
        return null;
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
