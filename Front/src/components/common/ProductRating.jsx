import { Button, Dialog, DialogActions } from "@mui/material";
import { useContext, useState } from "react";
import starImage from "../../assets/estrella.png";
import halfStarImage from "../../assets/halfEstrella.png";
import emptyStarImage from "../../assets/emptyEstrella.png";
import { submitRating } from "../../services";
import { AppContext } from "../../context";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";

const ProductRating = ({ ratings }) => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const { setError } = useContext(AppContext);

  const calculateAverageRating = () => {
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((acc, rating) => acc + rating, 0);
    const averageRating = (sumRatings / totalRatings).toFixed(1);

    return { averageRating, totalRatings };
  };

  const renderStarRating = (averageRating) => {
    const fullStars = Math.floor(averageRating);
    const halfStars = Math.ceil(averageRating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-star-${i}`}>
          <img
            style={{ width: "20px", height: "20px" }}
            src={starImage}
            alt=""
          />
        </span>
      );
    }

    for (let i = 0; i < halfStars; i++) {
      stars.push(
        <span key={`half-star-${i}`}>
          <img
            style={{ width: "20px", height: "20px" }}
            src={halfStarImage}
            alt=""
          />
        </span>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-star-${i}`}>
          <img
            style={{ width: "20px", height: "20px" }}
            src={emptyStarImage}
            alt=""
          />
        </span>
      );
    }

    return stars;
  };

  const { averageRating, totalRatings } = calculateAverageRating();
  const starRating = renderStarRating(averageRating);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRating(0);
  };

  const handleSubmitRating = (rating, productoId) => {
    const data = {
      usuarioId: 1902,
      productoId: productoId,
      nota: rating,
    };
    submitRating(data)
      .then(() => {
        console.log("Puntuación enviada:", rating);
        handleCloseModal();
        window.location.reload();
        console.log(data);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      });
  };
  return (
    <div>
      <div>
        <Button onClick={() => setShowModal(true)}>Calificar</Button>{" "}
        {averageRating}
      </div>
      <span>{starRating}</span>
      <span>({totalRatings})</span>
      {showModal && (
        <Dialog open={showModal} onClose={handleCloseModal}>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cerrar</Button>
          </DialogActions>
          <div>
            <p>¿Qué te ha parecido el producto?</p>
            <div>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedRating(index + 1)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    style={{ cursor: "pointer", width: "40px", height: "40px" }}
                    src={starImage}
                    alt=""
                  />
                </span>
              ))}
            </div>
          </div>
          <DialogActions>
            <Button onClick={() => handleSubmitRating(selectedRating, id)}>
              Enviar puntuación
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

ProductRating.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.number),
};

export default ProductRating;
