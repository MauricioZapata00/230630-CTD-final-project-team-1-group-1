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
import { PropTypes } from "prop-types";

const InputProduct = (props) => {
  const imageContainerId = "image-container-id";

  const imageCreatedId = "image-created-id";

  const { isOpenDialog, setIsOpenDialog } = props;

  const [productName, setProductName] = useState("");

  const [productDescription, setProductDescription] = useState("");

  const [productImageURL, setproductImageURL] = useState("");

  const [productImageByteArray, setProductImageByteArray] = useState([]);

  const handleProductNameChage = (event) => {
    setProductName(() => event.target.value);
  };

  const handleProductDescriptionChage = (event) => {
    setProductDescription(() => event.target.value);
  };

  const handleproductImageURLChage = (event) => {
    const fileReceived = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileReceived);
    console.log("event.target.files[0]", event.target.files[0]);
    reader.onloadend = (evt) => {
      convertArrayBufferToImage(evt.target.result, fileReceived.type);
    };
    setproductImageURL(() => event.target.value);
  };

  const convertArrayBufferToImage = (arrayBuffer, type) => {
    const byteArray = new Uint8Array(arrayBuffer);
    setProductImageByteArray(() => [byteArray]);
    const imageBlob = new Blob([byteArray], { type: type });
    const imageURL = URL.createObjectURL(imageBlob);
    createDynamicPicture(imageURL);
  };

  const createDynamicPicture = (imageToCreateURL) => {
    const imageContainer = document.getElementById(imageContainerId);
    imageContainer.appendChild(document.createElement("img"));
    let imageCreated = document.getElementsByTagName("img")[0];
    imageCreated.id = imageCreatedId;
    imageCreated.src = imageToCreateURL;
  };

  const createProduct = () => {
    console.log("productImageByteArray", productImageByteArray);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
    setProductName(() => "");
    setProductDescription(() => "");
    setproductImageURL(() => "");
    const imageToRemove = document.getElementById(imageCreatedId);
    if (imageToRemove) {
      imageToRemove.remove();
    }
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
            value={productImageURL}
            onChange={handleproductImageURLChage}
          />
        </Box>
        <div id={imageContainerId}>
          {/* <img id='image' src={productImageURL}/> */}
        </div>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={createProduct} autoFocus>
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
