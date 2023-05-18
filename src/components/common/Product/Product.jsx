import PropTypes from "prop-types";

const Product = ({ product }) => {
  const { imagenUrl, nombre, precio } = product;
  return (
    <div className="product">
      <div className="product__image-container">
        <img src={imagenUrl} alt={nombre} />
      </div>
      <h3>{nombre}</h3>
      <p>$ {precio}</p>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    imagenUrl: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
