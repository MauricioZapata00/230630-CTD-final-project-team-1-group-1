import { CircularProgress } from "@mui/material";
import PropTypes, { shape } from "prop-types";
import ProductItem from "../ProductItem";

const ProductsList = ({ products, loading }) => {
  return (
    <div className="products-list">
      {loading && (
        <div className="products-list__loading">
          <CircularProgress />
        </div>
      )}
      {!loading && products && (
        <div className="products-list__container">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <div className="products-list__empty">
              <p>No hay productos cargados.</p>
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

ProductsList.propTypes = {
  products: PropTypes.arrayOf(shape),
  loading: PropTypes.bool.isRequired,
};

export default ProductsList;
