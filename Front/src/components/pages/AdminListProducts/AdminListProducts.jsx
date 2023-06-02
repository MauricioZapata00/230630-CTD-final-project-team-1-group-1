import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getProducts } from "../../../services";
import { AppContext } from "../../../context";
import ProductsList from "../../common/ProductsList";

const AdminListProducts = () => {
  const { setError } = useContext(AppContext);

  const navigateTo = useNavigate();

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddProductClick = () => {
    navigateTo("/admin/crear-producto");
  };

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      })
      .finally(() => setLoading(false));
  }, [setError]);

  return (
    <div className="admin-list-products">
      <div className="admin-list-products__container">
        <div className="admin-list-products__header">
          <h3>Admin / Listado de productos</h3>
          <Button variant="contained" onClick={handleAddProductClick}>
            Crear Producto
          </Button>
        </div>
        <ProductsList products={products} loading={loading} />
      </div>
    </div>
  );
};

export default AdminListProducts;
