import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";

const ProductDetail = ({ productDetail }) => {
  const {
    imagenUrl,
    nombre,
    descripcion,
    precio,
    cantMin,
    minDiasReservaPrevia,
    permiteCambios,
    requierePagoAnticipado,
  } = productDetail;

  return (
    <div className="product-detail">
      <div className="product-detail__container-title">
        <h1 className="product-detail__title">{nombre}</h1>
      </div>
      <div className="product-detail__rating">
        <Stack spacing={1}>
          <Rating
            size="large"
            name="half-rating"
            defaultValue={3.5}
            precision={0.5}
            readOnly
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </Stack>
      </div>
      <div className="product-detail__image-grid">
        <img className="product-detail__main-image" src={imagenUrl} alt="" />
        <img src={imagenUrl} alt="" />
        <img src={imagenUrl} alt="" />
        <img src={imagenUrl} alt="" />
        <img src={imagenUrl} alt="" />
      </div>
      <div>
        <p>Descripción: {descripcion}</p>
        <div>
          <h4>¿Que ofrece este producto?</h4>
          <p>Cantidad Mínima: {cantMin}</p>
          <p>Cantidad de días de reserva:{minDiasReservaPrevia}</p>
          <p>{permiteCambios ? "Permite Cambios" : "No permite cambios"} </p>
          <p>
            {requierePagoAnticipado
              ? "Requiere pago anticipado"
              : "No requiere pago anticipado"}
          </p>
        </div>
        <p>Precio: ${precio}</p>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  productDetail: PropTypes.shape({
    imagenUrl: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    descripcion: PropTypes.string.isRequired,
    cantMin: PropTypes.number.isRequired,
    minDiasReservaPrevia: PropTypes.number.isRequired,
    permiteCambios: PropTypes.bool.isRequired,
    requierePagoAnticipado: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ProductDetail;
