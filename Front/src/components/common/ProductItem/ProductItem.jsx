import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
// import { useNavigate } from "react-router";

const ProductItem = ({ product }) => {
  const { imagenUrl, nombre, precio } = product;

  // const navigate = useNavigate();

  const handleClickNavigate = () => {
    // navigate(`/detalle/${id}`);
  };

  return (
    <div onClick={handleClickNavigate} className="product-item">
      <div className="product-item__image-container">
        <img src={imagenUrl} alt={nombre} />
      </div>
      <div className="product-item__info">
        <p>{nombre}</p>
        <p>$ {precio}</p>
      </div>
      <div className="product-item__actions">
        <IconButton aria-label="Editar" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="Editar" color="warning">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    imagenUrl: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
