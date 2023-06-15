import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import axios from "axios";

const AdminListUsers = () => {
  const { logedUser, setError } = useContext(AppContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (logedUser) {
      console.log({ jwt: logedUser.jwt });
      console.log({ Autorization: `Bearer ${logedUser.jwt}` });
      axios
        .get("http://localhost:8080/usuarios/todos", {
          headers: {
            Authorization: `Bearer ${logedUser.jwt}`,
          },
        })
        .then((response) => setUsers(response.data))
        .catch(() => {
          setError("Ha ocurrido un error");
        })
        .finally(() => setLoading(false));
    }
  }, [logedUser, setError]);

  return logedUser ? (
    <div className="admin-list-users">
      <div className="admin-list-users__container">
        <div className="admin-list-users__header">
          <h3>Admin / Listado de usuarios</h3>
          {loading && <p>Cargando...</p>}
          {users && users.map((user) => <p key={user.id}>{user.nombre}</p>)}
        </div>
      </div>
    </div>
  ) : null;
};

export default AdminListUsers;
