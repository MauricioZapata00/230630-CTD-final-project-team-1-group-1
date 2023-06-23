import PropTypes from "prop-types";

const Booking = ({ booking }) => {
    const { imagenUrl, nombre, precio, id, fecha } = booking;
   
    return (
      <div className="product">
        <div className="product__image-container">
          <img src={imagenUrl} alt={nombre} />
        </div>
        <h3>{nombre}</h3>
        <p>$ {precio}</p>
        <p>Fecha:{fecha}</p>
        <p>estado</p>
      </div>
    );
  };
  
  Booking.propTypes = {
    booking: PropTypes.shape({
      imagenUrl: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      precio: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    
  };
  
  export default Booking;