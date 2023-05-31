import { CircularProgress } from "@mui/material";
import Product from "../Product/Product";
import PropTypes, { shape } from "prop-types";

const Products = ({ products, loading }) => {
  return (
    <div className="products">
      
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
              No hay productos recomendados.
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
};

export default Products;
