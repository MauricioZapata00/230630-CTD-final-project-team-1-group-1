import { useContext } from "react";
import { AppContext } from "../../../context";

const UserPage = () => {
    const {userData } = useContext(AppContext);


    if (!userData) {
        return null;
      }    

    console.log(userData);
    const { nombre, apellido, email } = userData;
    return (
        <div>
            <div className="">
                <h2>Información del usuario:</h2>
                <label >Nombre:</label> <input type="text" value={nombre} />
                <p><label >Apellido:</label> <input type="text" value={apellido} /></p>
                <p><label >Email:</label> <input type="text" value={email} /></p>
            </div>
        </div>
    )
}

export default UserPage