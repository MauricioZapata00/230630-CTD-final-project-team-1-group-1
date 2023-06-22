import { useEffect, useState } from "react";
import Product from "../../common/Product/Product"
import ProductDetail from "../../common/ProductDetail"
import Booking from "../../common/Booking/Booking";

const BookingsPage = () => {
    const [reservas, setReservas] = useState([{ id: 3, nombre: 'hola', precio: 300 }, { id: 4, nombre: 'chau', precio: 300 }]);

    /* useEffect(() => {
         fetch(`/api/reservas/${id}`)
             .then(response => response.json())
             .then(data => setReservas(data))
             .catch(error => console.error(error));
     }, []);*/

    return (
        <div>
            <h2 style={{textAlign: 'center',padding: '1rem'}}>Mis reservas</h2>
            {reservas && (
                <div className="products__container">
                    {reservas.length > 0 ? (
                        reservas.map((reserva) => (
                            <Booking key={reserva.id} booking={reserva} ></Booking>
                        ))
                    ) : (
                        <div className="products__empty">
                            No hay productos para mostrar.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
export default BookingsPage