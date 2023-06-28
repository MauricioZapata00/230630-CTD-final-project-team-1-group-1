import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { AppContext } from "../../../context";
import axios from "axios";
import PropTypes from "prop-types";

const defaultCategoryData = {
  nombre: "",
  imgUrl: "",
};

const imageContainerId = "categoy-image-container-id";

const imageCreatedId = "image-created-id";

const FORM_FILE_STRING_CONST = "imgFile";

const FORM_OBJECT_STRING_CONST = "categoriaDto";

const CreateCategoryForm = ({ isFormOpen, setIsFormOpen }) => {
  const { setSuccess, setError } = useContext(AppContext);

  const [category, setCategory] = useState(defaultCategoryData);
  const [categoryImageURL, setCategoryImageURL] = useState("");
  const [file, setFile] = useState(null);
  const [stringImageUrl, setStringImageUrl] = useState("");

  const [sending, setSending] = useState(false);

  const [errors, setErrors] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCategory({ ...category, [name]: value });
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
  };

  const handleproductImageURLChage = (event) => {
    const fileReceived = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileReceived);
    reader.onloadend = (evt) => {
      convertArrayBufferToImage(evt.target.result, fileReceived.type);
    };
    setCategoryImageURL(event.result);
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

  const hasError = (name) => {
    const foundError = errors.find((error) => error.name === name);
    return foundError?.message;
  };

  const resetData = () => {
    setCategory(defaultCategoryData);
    setCategoryImageURL("");
    const imageToRemove = document.getElementById(imageCreatedId);
    if (imageToRemove) {
      imageToRemove.remove();
    }
  };

  const handleSubmit = () => {
    setError(null);

    const newErrors = [];
    if (category.nombre.trim().length < 4) {
      newErrors.push({
        name: "nombre",
        message: "El nombre debe contener al menos 4 caracteres.",
      });
    }

    if (stringImageUrl.length === 0) {
      newErrors.push({
        name: "imgUrl",
        message: "Se debe cargar una imágen.",
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    const data = { ...category, imgUrl: stringImageUrl };
    const formData = new FormData();

    formData.append(FORM_FILE_STRING_CONST, file, stringImageUrl);
    formData.append(FORM_OBJECT_STRING_CONST, JSON.stringify(data));

    setSending(true);

    axios
      .post(import.meta.env.VITE_CREATE_CATEGORY_URI, formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}; charset=utf-8`,
        },
      })
      .then(() => {
        setSending(false);
        resetData();
        setSuccess("La categoría se guardó correctamente.");
        setIsFormOpen(false);
      })
      .catch((error) => {
        setSending(false);
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      });
  };

  return (
    <Dialog
      open={isFormOpen}
      onClose={handleFormClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{"Nueva Categoría"}</DialogTitle>
      <DialogContent>
        <div className="form-control">
          <TextField
            error={!!hasError("nombre")}
            name="nombre"
            label="Ingrese el nombre de la Categoría"
            variant="outlined"
            fullWidth={true}
            value={category.nombre}
            onChange={handleChange}
            multiline
          />
          {!!hasError("nombre") && (
            <p className="error">{hasError("nombre")}</p>
          )}
        </div>

        <div className="form-control">
          <InputLabel>Cargar imágen</InputLabel>
          <input
            className="input-file"
            type="file"
            id="input-category-image-id"
            accept="image/png, image/jpeg"
            value={categoryImageURL}
            onChange={handleproductImageURLChage}
          />
          {!!hasError("imgUrl") && (
            <p className="error">{hasError("imgUrl")}</p>
          )}
          <div id={imageContainerId} className="preview"></div>
        </div>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancelar</Button>
          <LoadingButton
            onClick={handleSubmit}
            loading={sending}
            variant="contained"
            disabled={sending}
          >
            <span>Crear</span>
          </LoadingButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

CreateCategoryForm.propTypes = {
  isFormOpen: PropTypes.bool.isRequired,
  setIsFormOpen: PropTypes.func.isRequired,
};

export default CreateCategoryForm;
