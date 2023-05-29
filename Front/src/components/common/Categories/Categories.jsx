import { CircularProgress } from "@mui/material";
import Carrusel from "../Carrusel";
import Category from "../Category/Category";
import PropTypes, { shape } from "prop-types";

const Categories = ({ categories, loading }) => {
  return (
    <div className="categories">
      <h2>Categorías</h2>
      {loading && (
        <div className="categories__loading">
          <CircularProgress />
        </div>
      )}
      {!loading && categories && (
        <div className="categories__container">
          {categories.length > 0 ? (
            <Carrusel>
              {categories.map((category) => (
                <Category key={category.title} category={category} />
              ))}
            </Carrusel>
          ) : (
            <div className="categories__empty">No hay categorias cargadas.</div>
          )}
        </div>
      )}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.arrayOf(shape),
  loading: PropTypes.bool.isRequired,
};

export default Categories;
