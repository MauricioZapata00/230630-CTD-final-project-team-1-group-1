import PropTypes from "prop-types";

const Product = ({ product }) => {
  const { image, name, price } = product;
  return (
    <div className="product">
      <div className="product__image-container">
        <img src={image} alt={name} />
      </div>
      <h3>{name}</h3>
      <p>$ {price}</p>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Product;
