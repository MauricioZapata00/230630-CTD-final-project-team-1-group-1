import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Category = ({ category }) => {
  const { imgUrl, nombre, id } = category;

  const navigateTo = useNavigate();

  const handleCategory = () => {
    navigateTo(`/categoria/${id}`);
  };

  return (
    <div className="category">
      <div className="category__image-container">
        <img onClick={handleCategory} src={imgUrl} alt={nombre} />
      </div>
      <h3 className="category__name">{nombre}</h3>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    imgUrl: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Category;
