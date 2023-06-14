import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import ProductRating from "../ProductRating";
import { useContext } from "react";
import { AppContext } from "../../../context";

const Product = ({ product }) => {
  const { imagenUrl, nombre, precio, id } = product;
  const {rating } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/detalle/${id}`);
  };
  console.log(rating);
  return (
    <div onClick={handleClickNavigate} className="product">
      <div className="product__image-container">
        <img src={imagenUrl} alt={nombre} />
      </div>
      <h3>{nombre}</h3>
      <p>$ {precio}</p>
      <ProductRating ratings={rating} />
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
