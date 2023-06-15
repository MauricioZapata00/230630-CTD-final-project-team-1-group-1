import { CircularProgress } from "@mui/material";
import Product from "../Product/Product";
import PropTypes, { shape } from "prop-types";
import Carousel from "../Carousel";
import Pagination from "../Pagination";

const Products = ({ products, loading, title }) => {
 
  return (
    <div className="products">
      {title?.length > 0 && <h2>{title}</h2>}
      {loading && (
        <div className="products__loading">
          <CircularProgress />
        </div>
      )}
      {!loading && products && (
        <div className="products__container">
          {products.length > 0 ? (
              products.map((product) => (
                <Product key={product.id} product={product} />
              ))
      
          ) : (
            <div className="products__empty">
              No hay productos para mostrar.
            </div>
          )}
        </div>
      )}
      {!loading && !products && (
        <div className="products__empty">
          <p>No se pudieron cargar los productos</p>
        </div>
      )}
       
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(shape),
  loading: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Products;
