import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CircularProgress, IconButton } from "@mui/material";
import { deleteProduct } from "../../../services";
import { useContext, useState } from "react";
import { AppContext } from "../../../context";

// import { useNavigate } from "react-router";

const ProductItem = ({ product }) => {
  const { setError, setSuccess } = useContext(AppContext);
  const { imagenUrl, nombre, precio, id } = product;

  const [itemDeleted, setItemDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

  const handleClickNavigate = () => {
    // navigate(`/detalle/${id}`);
  };

  const handleClickDelete = () => {
    setLoading(true);
    deleteProduct(id)
      .then(() => {
        setSuccess("Se eliminó el producto correctamente");
        setItemDeleted(true);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        console.log({ error });
        setError(errorMsg || "Ha ocurrido un error.");
      })
      .finally(() => setLoading(false));
  };

  return !itemDeleted ? (
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
        <IconButton
          onClick={handleClickDelete}
          aria-label="Editar"
          color="warning"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress disableShrink size={22} />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </div>
    </div>
  ) : null;
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
