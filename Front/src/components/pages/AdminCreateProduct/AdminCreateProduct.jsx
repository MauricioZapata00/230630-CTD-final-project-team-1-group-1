import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import CreateCategoryForm from "../../common/CreateCategoryForm";
import ErrorMessage from "../../common/ErrorMessage";
import SuccessMessage from "../../common/SuccessMessage";
import { Link } from "react-router-dom";

const defaultProductData = {
  nombre: "",
  descripcion: "",
  precio: parseFloat(0),
  imagenUrl: "",
};

const imageContainerId = "product-image-container-id";

const imageCreatedId = "image-created-id";

const FORM_FILE_STRING_CONST = "imageFile";

const FORM_OBJECT_STRING_CONST = "productoDto";

const AdminCreateProduct = () => {
  const { success, setSuccess, error, setError } = useContext(AppContext);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [product, setProduct] = useState(defaultProductData);
  const [productImageURL, setProductImageURL] = useState("");
  const [file, setFile] = useState(null);
  const [stringImageUrl, setStringImageUrl] = useState("");

  const [sending, setSending] = useState(false);

  const [errors, setErrors] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === "precio" && isProductPriceCorrect(event.target.value)) {
      setProduct({ ...product, [name]: value });
      return;
    }
    setProduct({ ...product, [name]: value });
  };

  const isProductPriceCorrect = (value) => {
    if (value === "") {
      setProduct({ ...product, precio: 0 });
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
    setProductImageURL(event.result);
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
    setProduct(defaultProductData);
    setProductImageURL("");
    const imageToRemove = document.getElementById(imageCreatedId);
    if (imageToRemove) {
      imageToRemove.remove();
    }
  };

  const handleSubmit = () => {
    setError(null);
    const newErrors = [];
    if (product.nombre.trim().length < 4) {
      newErrors.push({
        name: "nombre",
        message: "El nombre debe contener al menos 4 caracteres.",
      });
    }

    if (product.descripcion.trim().length < 10) {
      newErrors.push({
        name: "descripcion",
        message: "La descripción debe contener al menos 10 caracteres.",
      });
    }

    if (stringImageUrl.length === 0) {
      newErrors.push({
        name: "imagenURL",
        message: "Se debe cargar una imágen.",
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    const data = { ...product, imagenUrl: stringImageUrl };
    const formData = new FormData();

    formData.append(FORM_FILE_STRING_CONST, file, stringImageUrl);
    formData.append(FORM_OBJECT_STRING_CONST, JSON.stringify(data));

    setSending(true);

    axios
      .post("http://localhost:8080/productos/registrar", formData, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}; charset=utf-8`,
        },
      })
      .then(() => {
        setSending(false);
        resetData();
        setSuccess("El producto se guardó correctamente.");
      })
      .catch((error) => {
        setSending(false);
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      });
  };

  useEffect(() => {
    setErrors([]);
    setProduct(defaultProductData);
  }, [isFormOpen]);

  return (
    <div className="admin-create-product">
      <div className="admin-create-product__container">
        <div className="admin-create-product__header">
          <h3>
            <Link to="/admin">Admin</Link> / Formulario de Producto
          </h3>
          <Button variant="contained" onClick={() => setIsFormOpen(true)}>
            Crear Categoría
          </Button>
        </div>
        <div>
          <div className="form-control">
            <TextField
              error={!!hasError("nombre")}
              name="nombre"
              label="Ingrese el nombre del producto"
              variant="outlined"
              fullWidth={true}
              value={product.nombre}
              onChange={handleChange}
            />
            {!!hasError("nombre") && (
              <p className="error">{hasError("nombre")}</p>
            )}
          </div>
          <div className="form-control">
            <TextField
              error={!!hasError("descripcion")}
              name="descripcion"
              label="Ingrese una descripción"
              variant="outlined"
              fullWidth={true}
              value={product.descripcion}
              onChange={handleChange}
              multiline
            />
            {!!hasError("descripcion") && (
              <p className="error">{hasError("descripcion")}</p>
            )}
          </div>

          <div className="form-control">
            <input
              type="file"
              id="input-product-image-id"
              accept="image/png, image/jpeg"
              value={productImageURL}
              onChange={handleproductImageURLChage}
            />

            {!!hasError("imagenURL") && (
              <p className="error">{hasError("imagenURL")}</p>
            )}

            <div id={imageContainerId} className="preview"></div>
          </div>

          <div className="form-control">
            <LoadingButton
              onClick={handleSubmit}
              loading={sending}
              variant="contained"
              disabled={sending}
            >
              <span>Crear Producto</span>
            </LoadingButton>
          </div>
        </div>
      </div>
      <CreateCategoryForm
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
      />
      {success && <SuccessMessage />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default AdminCreateProduct;
