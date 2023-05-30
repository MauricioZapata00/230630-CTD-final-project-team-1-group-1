import PropTypes from "prop-types";

const Category = ({ category }) => {
  const { imgUrl, nombre } = category;
  return (
    <div className="category">
      <div className="category__image-container">
        <img src={imgUrl} alt={nombre} />
      </div>
      <h3 className="category__name">{nombre}</h3>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
  }).isRequired,
};

export default Category;
