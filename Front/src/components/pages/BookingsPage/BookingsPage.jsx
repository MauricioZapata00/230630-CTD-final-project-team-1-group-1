import { useContext, useEffect, useState } from "react";
import Product from "../../common/Product/Product";
import ProductDetail from "../../common/ProductDetail";
import Booking from "../../common/Booking/Booking";
import { getBookingsForUser } from "../../../services";
import { AppContext } from "../../../context";

const BookingsPage = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const { error, setError, logedUser, setLogedUser } = useContext(AppContext);

  useEffect(() => {
    setLoading(true);

    getBookingsForUser(logedUser.email, logedUser.jwt)
      .then((response) => {
        setReservas(response.data);
        console.log(logedUser.email, reservas);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      })
      .finally(() => setLoading(false));
  }, [logedUser, setError, setLogedUser]);

  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "1rem" }}>Mis reservas</h2>
      {!loading ? (
        error ? (
          <div>{error}</div>
        ) : reservas.length > 0 ? (
          <div className="products__container">
            {reservas.map((reserva) => (
              <Booking key={reserva.id} booking={reserva} />
            ))}
          </div>
        ) : (
          <div className="products__empty">No ha realizado reservas aún.</div>
        )
      ) : (
        <div className="loading-message">Cargando...</div>
      )}
    </div>
  );
};
export default BookingsPage;
