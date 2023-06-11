import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategories, getProductDetail } from "../../../services";
import ProductForm from "../../common/ProductForm/ProductForm";
import { useContext } from "react";
import { AppContext } from "../../../context";
import { Button, CircularProgress } from "@mui/material";
import CreateCategoryForm from "../../common/CreateCategoryForm";

const AdminEditProduct = () => {
  const { id } = useParams();
  const { setError } = useContext(AppContext);
  console.log(id);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getProductDetail(id)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log("Ha ocurrido un error", error))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!isFormOpen) {
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
    <div className="admin-edit-product">
      <div className="admin-edit-product__container">
        <div className="admin-edit-product__header">
          <h3>
            <Link to="/admin">Admin</Link> / Editar Producto
          </h3>
          <Button variant="contained" onClick={() => setIsFormOpen(true)}>
            Crear Categoría
          </Button>
        </div>

        {loading && (
          <div className="admin-edit-product__loading">
            <CircularProgress />
          </div>
        )}
        {product && categories && (
          <ProductForm categories={categories} selectedProduct={product} />
        )}
        <CreateCategoryForm
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
        />
      </div>
    </div>
  );
};

export default AdminEditProduct;
