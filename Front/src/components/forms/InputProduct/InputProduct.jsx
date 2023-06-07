import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../../../context";
// import FormatText from "./../../common/FormatText";

const InputProduct = (props) => {
  const { setSuccess, setError } = useContext(AppContext);

  const imageContainerId = "image-container-id";

  const imageCreatedId = "image-created-id";

  const FORM_FILE_STRING_CONST = "imageFile";

  const FORM_OBJECT_STRING_CONST = "productoDto";

  const { isOpenDialog, setIsOpenDialog } = props;

  const [productName, setProductName] = useState("");

  const [productDescription, setProductDescription] = useState("");

  const [productImageURL, setproductImageURL] = useState("");

  const [productPrice, setProductPrice] = useState(0);

  const [file, setFile] = useState(null);

  const [stringImageUrl, setStringImageUrl] = useState("");

  const [sending, setSending] = useState(false);

  const handleProductNameChage = (event) => {
    setProductName(() => event.target.value);
  };

  const handleProductDescriptionChage = (event) => {
    setProductDescription(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    if (isProductPriceCorrect(event.target.value)) {
      setProductPrice(event.target.value);
    }
  };

  const isProductPriceCorrect = (value) => {
    if (value === "") {
      setProductPrice(0);
      return false;
    }
    return true;
  };

  const handleproductImageURLChage = (event) => {
    const fileReceived = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileReceived);
    reader.onloadend = (evt) => {
      convertArrayBufferToImage(evt.target.result, fileReceived.type);
    };
    setproductImageURL(event.result);
    setFile(fileReceived);
    setStringImageUrl("" + Date.now() + fileReceived.name);
  };

  const convertArrayBufferToImage = (arrayBuffer, type) => {
    const byteArray = new Uint8Array(arrayBuffer);
    const imageBlob = new Blob([byteArray], { type: type });
    const imageURL = URL.createObjectURL(imageBlob);
    createDynamicPicture(imageURL);
  };

  const createDynamicPicture = (imageToCreateURL) => {
    const imageContainer = document.getElementById(imageContainerId);
    const img = document.createElement("img");
    img.id = imageCreatedId;
    imageContainer.appendChild(img);
    let imageCreated = document.getElementById(imageCreatedId);
    imageCreated.src = imageToCreateURL;
  };

  const createProduct = () => {
    setError(null);
    const dtoObject = createProductDtoToCreate();
    const formData = new FormData();

    formData.append(FORM_FILE_STRING_CONST, file, stringImageUrl);
    formData.append(FORM_OBJECT_STRING_CONST, JSON.stringify(dtoObject));

    setSending(true);

    axios
      .post(import.meta.env.VITE_CREATE_PRODUCT_URI, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}; charset=utf-8`,
        },
      })
      .then((response) => {
        setSending(false);
        console.log(response.data);
        handleCloseDialog();
        setSuccess("El producto se guardó correctamente.");
      })
      .catch((error) => {
        setSending(false);
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      });
  };

  const createProductDtoToCreate = () => {
    const objectToReturn = {
      nombre: productName,
      descripcion: productDescription,
      precio: parseFloat(productPrice),
      imagenUrl: stringImageUrl,
    };
    return objectToReturn;
  };

  const handleCloseDialog = () => {
    setProductName("");
    setProductDescription("");
    setproductImageURL("");
    setProductPrice(0);
    const imageToRemove = document.getElementById(imageCreatedId);
    if (imageToRemove) {
      imageToRemove.remove();
    }
    setIsOpenDialog(false);
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
          {/* <FormatText
            placeholder="Descripción"
            value={productDescription}
            setValue={setProductDescription}
          /> */}
        </Box>
        <OutlinedInput
          id="input-product-price-id"
          inputProps={{
            type: "number",
            min: "0",
            step: "0.01",
            label: "Precio del producto:",
          }}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          value={productPrice.toString()}
          onChange={handleProductPriceChange}
        />
        <Box sx={{ margin: "15px 0" }}>
          <input
            type="file"
            id="input-product-image-id"
            accept="image/png, image/jpeg"
            value={productImageURL}
            onChange={handleproductImageURLChage}
          />
        </Box>
        <div id={imageContainerId} className="preview">
          {/* <img id='image' src={productImageURL}/> */}
        </div>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <LoadingButton
            size="small"
            onClick={createProduct}
            endIcon={<SaveIcon />}
            loading={sending}
            loadingPosition="end"
            variant="contained"
            disabled={sending}
          >
            <span>Guardar</span>
          </LoadingButton>
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
