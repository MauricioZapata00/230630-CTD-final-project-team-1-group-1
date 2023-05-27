import PropTypes from "prop-types";

const ProductDetail = ({ productDetail }) => {
  const { imagenUrl, nombre, descripcion, precio, id } = productDetail;

  return (
    <div>
      <p>Id de producto: {id}</p>
      <div>
        <div>
          <img src={imagenUrl} alt="" />
        </div>
        <div>
          <p>{nombre}</p>
          <p>{descripcion}</p>
          <p>{precio}</p>
        </div>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  productDetail: PropTypes.shape({
    imagenUrl: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    descripcion: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductDetail;
