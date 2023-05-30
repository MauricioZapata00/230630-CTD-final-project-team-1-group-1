import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const AdminListProducts = () => {
  const navigateTo = useNavigate();
  const handleAddProductClick = () => {
    navigateTo("/admin/crear-producto");
  };
  return (
    <div className="admin-list-products">
      <div className="admin-list-products__container">
        <div className="admin-list-products__header">
          <h3>Admin</h3>
          <Button variant="contained" onClick={handleAddProductClick}>
            Crear Producto
          </Button>
        </div>
        <div>Listado de productos a administrar</div>
      </div>
    </div>
  );
};

export default AdminListProducts;
