import { CircularProgress } from "@mui/material";
import Category from "../Category/Category";
import PropTypes, { shape } from "prop-types";
import Carousel from "../Carousel";

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
            <Carousel>
              {categories.map((category) => (
                <Category key={category.id} category={category} />
              ))}
            </Carousel>
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
