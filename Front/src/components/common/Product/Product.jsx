import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const Product = ({ product }) => {
  const { imagenUrl, nombre, precio, id } = product;
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/detalle/${id}`);
  };
  return (
    <div onClick={handleClickNavigate} className="product">
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
    id: PropTypes.number.isRequired,
  }).isRequired,
  rating: PropTypes.arrayOf(PropTypes.number),
};

export default Product;
