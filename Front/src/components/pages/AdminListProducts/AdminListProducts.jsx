import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getProducts } from "../../../services";
import { AppContext } from "../../../context";
import ProductsList from "../../common/ProductsList";
import Pagination from "../../common/Pagination";

const AdminListProducts = () => {
  const { setError } = useContext(AppContext);

  const navigateTo = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPageAdm, setCurrentPageAdm] = useState(0);

  const handleAddProductClick = () => {
    navigateTo("/admin/crear-producto");
  };

  useEffect(() => {
    getProducts(currentPageAdm)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      })
      .finally(() => setLoading(false));
  }, [currentPageAdm, setError]);

  const handleNextPage = () => {
    setCurrentPageAdm((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPageAdm((prevPage) => prevPage - 1);
  };

  
  const handleResetPage = () => {
    setCurrentPageAdm(0);
  };

  const handleLastPage = () => {
    setCurrentPageAdm(2);
  };

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
        <Pagination
          currentPage={currentPageAdm}
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          handleLastPage={handleLastPage}
          handleResetPage={handleResetPage}
        />
      </div>
    </div>
  );
};

export default AdminListProducts;
