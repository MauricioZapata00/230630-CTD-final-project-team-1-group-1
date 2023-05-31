import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import CreateCategoryForm from "../../common/CreateCategoryForm";
import ErrorMessage from "../../common/ErrorMessage";
import SuccessMessage from "../../common/SuccessMessage";
import { Link } from "react-router-dom";
import { getCategories } from "../../../services";

const defaultProductData = {
  nombre: "",
  descripcion: "",
  precio: parseFloat(0),
  imagenUrl: "",
  cantMin: 0,
  requierePagoAnticipado: false,
  minDiasReservaPrevia: 0,
  permiteCambios: false,
  nombreCategoria: "",
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

  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  const [sending, setSending] = useState(false);

  const [errors, setErrors] = useState([]);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    console.log({ target });
    if (name === "requierePagoAnticipado" || name === "permiteCambios") {
      setProduct({ ...product, [name]: target.checked });
      return;
    }

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

    if (product.nombreCategoria === "") {
      newErrors.push({
        name: "categoria",
        message: "Debe seleccionar una categoría.",
      });
    }

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

    if (product.precio === 0) {
      newErrors.push({
        name: "precio",
        message: "Debe ingresar un precio.",
      });
    }

    if (product.cantMin === 0) {
      newErrors.push({
        name: "cantMin",
        message: "Debe ingresar una cantidad mínima de productos.",
      });
    }

    if (product.minDiasReservaPrevia === 0) {
      newErrors.push({
        name: "minDiasReservaPrevia",
        message: "Debe ingresar una cantidad mínima de días.",
      });
    }

    if (stringImageUrl.length === 0) {
      newErrors.push({
        name: "imagenURL",
        message: "Debe cargar una imágen.",
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
    if (!isFormOpen) {
      setErrors([]);
      setProduct(defaultProductData);
      setLoading(true);
      getCategories()
        .then((response) => {
          setCategories(response.data);
        })
        .catch(() => {
          setError("Ha ocurrido un error en el servidor");
        })
        .finally(() => setLoading(false));
    }
  }, [isFormOpen, setError]);

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

        {loading && (
          <div className="admin-create-product__loading">
            <CircularProgress />
          </div>
        )}

        {!loading && categories?.length > 0 && (
          <>
            <div className="admin-create-product__form">
              <div>
                <div className="form-control">
                  <FormControl fullWidth error={!!hasError("categoria")}>
                    <InputLabel id="category-select-label">
                      Categoría
                    </InputLabel>
                    <Select
                      labelId="category-select-label"
                      id="category-select"
                      value={product.nombreCategoria}
                      label="Categoría"
                      onChange={handleChange}
                      name="nombreCategoria"
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.nombre}>
                          {category.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {!!hasError("categoria") && (
                    <p className="error">{hasError("categoria")}</p>
                  )}
                </div>
                <div className="form-control">
                  <TextField
                    error={!!hasError("nombre")}
                    name="nombre"
                    label="Nombre"
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
                    label="Descripción"
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
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Precio
                    </InputLabel>
                    <OutlinedInput
                      error={!!hasError("precio")}
                      fullWidth
                      inputProps={{
                        type: "number",
                        min: "0",
                        step: "0.01",
                      }}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Precio"
                      value={product.precio.toString()}
                      onChange={handleChange}
                      name="precio"
                    />
                  </FormControl>
                  {!!hasError("precio") && (
                    <p className="error">{hasError("precio")}</p>
                  )}
                </div>
                <div className="form-control">
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Cantidad mínima de productos
                    </InputLabel>
                    <OutlinedInput
                      error={!!hasError("cantMin")}
                      inputProps={{
                        type: "number",
                        min: "0",
                      }}
                      label="Cantidad mínima de productos"
                      value={product.cantMin}
                      onChange={handleChange}
                      name="cantMin"
                    />
                  </FormControl>
                  {!!hasError("cantMin") && (
                    <p className="error">{hasError("cantMin")}</p>
                  )}
                </div>
                <div className="form-control">
                  <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Cantidad mínima de días de reserva previa
                    </InputLabel>
                    <OutlinedInput
                      error={!!hasError("minDiasReservaPrevia")}
                      inputProps={{
                        type: "number",
                        min: "0",
                      }}
                      label="Cantidad mínima de días de reserva previa"
                      value={product.minDiasReservaPrevia}
                      onChange={handleChange}
                      name="minDiasReservaPrevia"
                    />
                  </FormControl>
                  {!!hasError("minDiasReservaPrevia") && (
                    <p className="error">{hasError("minDiasReservaPrevia")}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="form-control">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Requiere pago anticipado"
                      checked={product.requierePagoAnticipado}
                      onChange={handleChange}
                      name="requierePagoAnticipado"
                    />
                  </FormGroup>
                </div>
                <div className="form-control">
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Permite cambios"
                      checked={product.permiteCambios}
                      onChange={handleChange}
                      name="permiteCambios"
                    />
                  </FormGroup>
                </div>
                <div className="form-control">
                  <InputLabel>Cargar imágen</InputLabel>
                  <input
                    className="input-file"
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
              </div>
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
          </>
        )}

        {!loading && categories?.length === 0 && (
          <div className="admin-create-product__no-categories">
            <p>No hay categorías cargadas.</p>
            <p>
              Antes de crear un producto se debe crear al menos una categoría.{" "}
            </p>
          </div>
        )}
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
