import { Button, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getProducts } from "../../../services";
import { AppContext } from "../../../context";

const AdminListProducts = () => {
  const { error, setError } = useContext(AppContext);

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
      .catch(() => {
        setError("Ha ocurrido un error en el servidor");
      })
      .finally(() => setLoading(false));
  }, [setError]);

  return (
    <div className="admin-list-products">
      <div className="admin-list-products__container">
        <div className="admin-list-products__header">
          <h3>Admin</h3>
          <Button variant="contained" onClick={handleAddProductClick}>
            Crear Producto
          </Button>
        </div>
        {loading && (
          <div className="admin-list-products__loading">
            <CircularProgress />
          </div>
        )}
        {!loading && products && (
          <div>
            {products.map((product) => (
              <p key={product.id}>{product.nombre}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminListProducts;
