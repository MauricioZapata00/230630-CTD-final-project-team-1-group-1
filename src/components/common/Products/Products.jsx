import Product from "../Product/Product";
import PropTypes, { shape } from "prop-types";

const Products = ({ products }) => {
  return (
    <div className="products">
      <h2>Productos Recomendados</h2>
      <div className="products__container">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.arrayOf(shape).isRequired,
};

export default Products;
