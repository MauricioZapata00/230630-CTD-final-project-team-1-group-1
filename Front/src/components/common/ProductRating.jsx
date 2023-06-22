import { Button, Dialog, DialogActions } from "@mui/material";
import { useContext, useEffect, useState } from "react";
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
  const { setError, logedUser } = useContext(AppContext);
  const [isImageFocused, setIsImageFocused] = useState('');
  const[dataId, setDataId]=useState(null)

  const calculateAverageRating = () => {
    const totalRatings = ratings ? ratings.length : 0;
    const sumRatings = ratings ? ratings.reduce((acc, rating) => acc + rating, 0) : 0;
    const averageRating = ratings ? (sumRatings / totalRatings).toFixed(1) : 0;
    const validAverageRating = isNaN(averageRating) ? 0 : averageRating;
    return { averageRating: validAverageRating, totalRatings };
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

  
  useEffect(() => {
    const logedUserData = localStorage.getItem("logedUser");
    if (logedUserData) {
      const userData = JSON.parse(logedUserData)
      setDataId(userData.id)
      console.log(userData.id);
     console.log(dataId);
    }
  }, [setDataId]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRating(0);
  };
  
  const handleSubmitRating = (rating, productoId, dataId) => {
    
    const data = {
      usuarioId: dataId,
      productoId: productoId,
      nota: rating,
    };
    submitRating(data)
      .then(() => {
        console.log("Puntuación enviada:", rating);
        handleCloseModal();
        window.location.reload();
        console.log(data);
       ;
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      });
  };

  const handleImageClick = (index) => {
    setIsImageFocused(index +1);
  };
  return (
    <div>
      <div className="rating">
        <div>
        {logedUser && (
          <Button onClick={() => setShowModal(true)}>Calificar</Button>
        )}
        <span className="rating__average">{averageRating}</span>
        </div>
        <p>{starRating}<span>({totalRatings})</span></p>
      </div>
      {showModal && (
        <Dialog open={showModal} onClose={handleCloseModal}>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cerrar</Button>
          </DialogActions>
          <div className="calification">
            <p>¿Qué te ha parecido el producto?</p>
            <div>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedRating(index + 1)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    className={isImageFocused === index + 1 ? 'focused' : ''}
                    src={starImage}
                    alt=""
                    onClick={() => handleImageClick(index)}
                  />
                </span>
              ))}
            </div>
          </div>
          <DialogActions>
            <Button onClick={() => handleSubmitRating(selectedRating, id , dataId)}>
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
