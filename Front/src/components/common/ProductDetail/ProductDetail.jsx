import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

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
        <p className="product-detail__description">{descripcion}</p>
        <div className="product-detail__features-container">
          <h4>¿Que ofrece este producto?</h4>
          <div className="product-detail__features">
            <div>
              <p>
                <CheckCircleOutlineOutlinedIcon />
                <b>Cantidad Mínima:</b> {cantMin}
              </p>
              <p>
                <CheckCircleOutlineOutlinedIcon />
                <b>Cantidad de días de reserva:</b> {minDiasReservaPrevia}
              </p>
            </div>
            <div>
              <p>
                <CheckCircleOutlineOutlinedIcon />
                {permiteCambios ? "Permite Cambios" : "No permite cambios"}{" "}
              </p>
              <p>
                <CheckCircleOutlineOutlinedIcon />
                {requierePagoAnticipado
                  ? "Requiere pago anticipado"
                  : "No requiere pago anticipado"}
              </p>
            </div>
          </div>
        </div>
        <p className="product-detail__price">${precio.toFixed(2)}</p>
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
