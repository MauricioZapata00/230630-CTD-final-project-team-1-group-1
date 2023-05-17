import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

const InputProduct = (props) => {
  const { isOpenDialog, setIsOpenDialog } = props;

  const [productName, setProductName] = useState("");

  const [productDescription, setProductDescription] = useState("");

  const [productImage, setProductImage] = useState("");

  const handleProductNameChage = (event) => {
    setProductName(() => event.target.value);
  };

  const handleProductDescriptionChage = (event) => {
    setProductDescription(() => event.target.value);
  };

  const handleProductImageChage = (event) => {
    setProductImage(() => event.target.value);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
    setProductName(() => "");
    setProductDescription(() => "");
    setProductImage(() => "");
  };

  return (
    <Dialog
      open={isOpenDialog}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"lg"}
      fullWidth={true}
    >
      <DialogTitle id="enter-product-dialog-title-id">
        {"Ingresa los datos del producto:"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ margin: "15px 0" }}>
          <TextField
            id="input-product-name-id"
            label="Nombre del producto:"
            variant="outlined"
            fullWidth={true}
            value={productName}
            onChange={handleProductNameChage}
          />
        </Box>
        <Box sx={{ margin: "15px 0" }}>
          <TextField
            id="input-product-description-id"
            label="Descripción del producto:"
            multiline={true}
            minRows={2}
            variant="outlined"
            fullWidth={true}
            value={productDescription}
            onChange={handleProductDescriptionChage}
          />
        </Box>
        <Box sx={{ margin: "15px 0" }}>
          <input
            type="file"
            id="input-product-image-id"
            accept="image/png, image/jpeg"
            value={productImage}
            onChange={handleProductImageChage}
          />
        </Box>

        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={() => {}} autoFocus>
            Crear producto
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

InputProduct.propTypes = {
  isOpenDialog: PropTypes.bool.isRequired,
  setIsOpenDialog: PropTypes.func.isRequired,
};

export default InputProduct;
