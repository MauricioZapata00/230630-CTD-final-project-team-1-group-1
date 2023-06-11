import { Button, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context";
import CreateCategoryForm from "../../common/CreateCategoryForm";
import { Link } from "react-router-dom";
import { getCategories } from "../../../services";
import ProductForm from "../../common/ProductForm/ProductForm";

const AdminCreateProduct = () => {
  const { setError } = useContext(AppContext);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isFormOpen) {
      setLoading(true);
      getCategories()
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          const errorMsg = error?.response?.data?.description;
          setError(errorMsg || "Ha ocurrido un error.");
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
          <ProductForm categories={categories} selectedProduct={null} />
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
    </div>
  );
};

export default AdminCreateProduct;
