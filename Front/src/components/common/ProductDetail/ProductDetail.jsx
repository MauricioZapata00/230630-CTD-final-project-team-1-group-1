import PropTypes from "prop-types";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useContext, useState } from "react";
import { Button, Dialog, DialogActions } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ProductRating from "../ProductRating";
import { AppContext } from "../../../context";
import ImageGallery from "../ImageGallery";
import { LoadingButton } from "@mui/lab";

const ProductDetail = ({ productDetail }) => {
  const { rating, logedUser, error, setError } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  console.log(rating);
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

  const handleGoToBooking = () => {
    if (!logedUser) {
      navigate('/ingreso')
    } else {
      setShowModal(true)
    }
  }
  const handleContinueBooking = () => {
    navigate(`/reservas/${productDetail._id}`)
  }
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="product-detail">
      <div className="product-detail__container-title">
        <h1 className="product-detail__title">{nombre}</h1>
      </div>
      <div className="product-detail__rating">
        <IconButton onClick={goBack} aria-label="volver">
          <ArrowBackIcon />
        </IconButton>
        <ProductRating ratings={rating} />
      </div>
      <ImageGallery
        galleryID="product-detail-gallery"
        images={[
          { url: imagenUrl, width: 800, height: 600 },
          {
            url: "https://www.cgmiami.org/wp-content/uploads/2022/07/1658328558_catchy-catering-company-names-1024x682.jpg",
            width: 800,
            height: 600,
          },
          {
            url: "https://cdn0.casamientos.com.ar/vendor/9059/3_2/960/jpeg/processed-881be620-6327-4a62-af51-2f777c6e6340-9hxm7mfx_7_159059-163484209376997.jpeg",
            width: 800,
            height: 600,
          },
          {
            url: "https://definicion.de/wp-content/uploads/2016/08/catering-1.jpg",
            width: 800,
            height: 600,
          },
          {
            url: "https://i.pinimg.com/originals/ea/a6/a8/eaa6a8e8c7c1685c062e26130f494bde.jpg",
            width: 800,
            height: 600,
          },
        ]}
      />
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
        <p className="product-detail__price">
          <LoadingButton onClick={handleGoToBooking} variant="contained">Realizar reserva</LoadingButton>
          ${precio.toFixed(2)}
        </p>
      </div>
      {showModal && (
        <Dialog open={showModal} onClose={handleCloseModal}>
          <DialogActions>
            <Button style={{ fontWeight: "600" }} onClick={handleCloseModal}>X</Button>
          </DialogActions>
          <div className="calification">
            <p style={{ fontWeight: "600" }}>Elige la fecha que deseas reservar este producto</p>
            <div>
              <p>calendario</p>        
            </div>
          </div>
          <DialogActions style={{justifyContent: 'center', marginBottom: '1rem'}} >
            <Button variant="contained" onClick={handleContinueBooking} >Continuar reserva</Button>
          </DialogActions>
        </Dialog>
      )}
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
  rating: PropTypes.arrayOf(PropTypes.number),
};

export default ProductDetail;
