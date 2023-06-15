import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { deleteProduct } from "../../../services";
import { useContext, useState, forwardRef } from "react";
import { AppContext } from "../../../context";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProductItem = ({ product }) => {
  const { setError, setSuccess, logedUser } = useContext(AppContext);
  const { imagenUrl, nombre, precio, id } = product;

  const [itemDeleted, setItemDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(`/admin/editar-producto/${id}`);
  };

  const handleCloseDialog = () => setShowConfirmDialog(false);

  const hadleClickConfirm = () => {
    setLoading(true);
    deleteProduct(id, logedUser.jwt)
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
    <>
      <div className="product-item">
        <div className="product-item__image-container">
          <img src={imagenUrl} alt={nombre} />
        </div>
        <div className="product-item__info">
          <p className="product-item__name">{nombre}</p>
          <p className="product-item__price">$ {precio}</p>
        </div>
        <div className="product-item__actions">
          <Tooltip placement="top" title="Editar producto" arrow>
            <IconButton
              onClick={handleClickEdit}
              aria-label="Editar"
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip placement="top" title="Eliminar producto" arrow>
            <IconButton
              onClick={() => setShowConfirmDialog(true)}
              aria-label="Eliminar"
              color="warning"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress disableShrink size={22} />
              ) : (
                <DeleteIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Dialog
        open={showConfirmDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Eliminar Producto</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`¿Estás seguro de eliminar el producto ${nombre}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseDialog}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={hadleClickConfirm}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
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
