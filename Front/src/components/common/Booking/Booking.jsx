import PropTypes from "prop-types";

const Booking = ({ booking }) => {
    const { valorReserva, fechaReserva, imagenUrl, nombreProducto, fechaCreacion } = booking;
    const { 0: year, 1: month, 2: day } = fechaCreacion;

    return (
        <div className="booking">
           
            <div className="booking__image-container">
                <img src={imagenUrl} alt={nombreProducto} />
            </div>
            <div style={{display: 'flex',flexDirection: 'column', justifyContent: 'space-around'}}>
            <h3>{nombreProducto} </h3>
            <p style={{color: 'black', display: 'flex', justifyContent: 'end'}}>$ {valorReserva}</p></div>
            <p>Día de entrega: <hr />{fechaReserva} </p>
            <p>La reserva fue realizada el día : {year}/{month}/{day}</p>
        </div>
    );
};

Booking.propTypes = {
    booking: PropTypes.shape({
        nombreProducto: PropTypes.string.isRequired,
        valorReserva: PropTypes.number.isRequired,
        fechaReserva: PropTypes.string.isRequired,
    }).isRequired,

};

export default Booking;
