import { useContext, useEffect, useState } from "react";
import Booking from "../../common/Booking/Booking";
import { getBookingsForUser } from "../../../services";
import { AppContext } from "../../../context";

const BookingsPage = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const { error, setError, logedUser} = useContext(AppContext);

    useEffect(() => {
        if (logedUser) {

            getBookingsForUser(logedUser.email, logedUser.jwt)
                .then((response) => {
                    setReservas(response.data);
                    console.log('hola');
                })
                .catch((error) => {
                    const errorMsg = error?.response?.data?.description;
                    setError(errorMsg || "Ha ocurrido un error.");
                    setLoading(false);
                })
                .finally(() => setLoading(false));
        }
    }, [logedUser, setError]);

    return (
        <div>
            <h2 style={{ textAlign: 'center', padding: '1rem' }}>Mis reservas</h2>
            {!loading && logedUser && (
                reservas.length > 0 ? (
                    <div className="products__container" style={{ marginBottom: '2rem' }}>
                        {reservas.map((reserva) => (
                            <Booking key={reserva.id} booking={reserva} />
                        ))}
                    </div>
                ) : (
                    <div className="products__empty">
                        No has realizado reservas.
                    </div>
                ))}
            {!loading && !logedUser && (
                <div className="products__empty">
                    <p>No se pudieron cargar los productos</p>
                </div>
            )}

        </div>
    )
}
export default BookingsPage
