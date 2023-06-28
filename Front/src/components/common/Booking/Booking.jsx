import PropTypes from "prop-types";

const Booking = ({ booking }) => {
  const { idProducto, valorReserva, fechaReserva } = booking;

  return (
    <div className="product">
      {/*<div className="product__image-container">
          <img src={imagenUrl} alt={nombre} />
    </div>*/}
      <h3>{idProducto}</h3>
      <p>$ {valorReserva}</p>
      <p>Fecha:{fechaReserva}</p>
      <p>estado</p>
    </div>
  );
};

Booking.propTypes = {
  booking: PropTypes.shape({
    idProducto: PropTypes.string.isRequired,
    valorReserva: PropTypes.number.isRequired,
    fechaReserva: PropTypes.string.isRequired,
  }).isRequired,
};

export default Booking;
