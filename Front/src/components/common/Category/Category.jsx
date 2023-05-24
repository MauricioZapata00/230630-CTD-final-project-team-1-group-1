import PropTypes from "prop-types";

const Category = ({ category }) => {
  const { image, title, products } = category;
  return (
    <div className="category">
      <div className="category__image-container">
        <img src={image} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{products} productos</p>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    products: PropTypes.number.isRequired,
  }).isRequired,
};

export default Category;
