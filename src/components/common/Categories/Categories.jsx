import Carrusel from "../Carrusel";
import Category from "../Category/Category";
import PropTypes, { shape } from "prop-types";

const Categories = ({ categories }) => {
  return (
    <div className="categories">
      <h2>Categorías</h2>
      <div className="categories__container">
        <Carrusel>
          {categories.map((category) => (
            <Category key={category.title} category={category} />
          ))}
        </Carrusel>
      </div>
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(shape).isRequired,
};

export default Categories;
