import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useState } from "react";
import { Button, Dialog, DialogActions } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ProductDetail = ({ productDetail }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

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

  const handleCloseModal = () => {
    setShowModal(false);
  };
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
        <IconButton onClick={goBack} aria-label="volver">
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className="product-detail__image-grid">
        <img className="product-detail__main-image" src={imagenUrl} alt="" />
        <img
          src={imagenUrl}
          className="product-detail__image-selected"
          alt=""
        />
        <img
          src="https://www.cgmiami.org/wp-content/uploads/2022/07/1658328558_catchy-catering-company-names-1024x682.jpg"
          alt=""
        />
        <img
          src="https://cdn0.casamientos.com.ar/vendor/9059/3_2/960/jpeg/processed-881be620-6327-4a62-af51-2f777c6e6340-9hxm7mfx_7_159059-163484209376997.jpeg"
          alt=""
        />
        <img
          src="https://definicion.de/wp-content/uploads/2016/08/catering-1.jpg"
          alt=""
        />
      </div>
      {showModal && (
        <Dialog open={showModal} onClose={handleCloseModal}>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cerrar</Button>
          </DialogActions>
          <div className="product-detail__image-grid">
            <img
              className="product-detail__main-image"
              src={imagenUrl}
              alt=""
            />
            <img
              src={imagenUrl}
              className="product-detail__image-selected"
              alt=""
            />
            <img
              src="https://www.cgmiami.org/wp-content/uploads/2022/07/1658328558_catchy-catering-company-names-1024x682.jpg"
              alt=""
            />
            <img
              src="https://cdn0.casamientos.com.ar/vendor/9059/3_2/960/jpeg/processed-881be620-6327-4a62-af51-2f777c6e6340-9hxm7mfx_7_159059-163484209376997.jpeg"
              alt=""
            />
            <img
              src="https://definicion.de/wp-content/uploads/2016/08/catering-1.jpg"
              alt=""
            />
          </div>
        </Dialog>
      )}

      <Button
        variant="contained"
        className="product-detail__button-verMas"
        onClick={() => setShowModal(true)}
      >
        Ver mas
      </Button>

      <div>
        <p className="product-detail__description">{descripcion}</p>
        <div className="product-detail__features-container">
          <h4>¿Qué ofrece este producto?</h4>
          <div className="product-detail__features">
            <div>
              <p>
                <CheckCircleOutlineOutlinedIcon />
                Cantidad Mínima de productos: {cantMin}
              </p>
              <p>
                <CheckCircleOutlineOutlinedIcon />
                Cantidad mínima de días de reserva:
                {minDiasReservaPrevia}
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
