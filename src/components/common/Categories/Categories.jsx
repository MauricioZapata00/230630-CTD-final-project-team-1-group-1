import Category from "../Category/Category";
import PropTypes, { shape } from "prop-types";

const Categories = ({ categories }) => {
  return (
    <div className="categories">
      <h2>Buscar por tipo de evento</h2>
      <div className="categories__container">
        {categories.map((category) => (
          <Category key={category.title} category={category} />
        ))}
      </div>
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(shape).isRequired,
};

export default Categories;
