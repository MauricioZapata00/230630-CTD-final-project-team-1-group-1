import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../context";
import { getCategoryDetail, getProductDetail } from "../../../services";
import Products from "../../common/Products";
import ErrorMessage from "../../common/ErrorMessage";
import { Button, CircularProgress } from "@mui/material";

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const [showAllProducts, setShowAllProducts] = useState(false);

  useEffect(() => {
    const fetchCategoryDetail = async () => {
      try {
        const response = await getCategoryDetail(params.id);
        console.log(response.data);
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error al obtener los productos de la categoría", error);
      }
    };

    fetchCategoryDetail();
  }, [params.id]);

  const visibleProducts = showAllProducts ? products : products.slice(0, 2);

  const handleShowAllProducts = () => {
    setShowAllProducts(true);
  };

  return (
    <div className="category-page">
      <h2>
        Productos de la categoría{" "}
        {products.length > 0 ? products[0].nombreCategoria : ""}
      </h2>
      <div className="category-page__products">
        <Products products={visibleProducts} title="" />
      </div>
      {!showAllProducts && (
        <Button variant="contained" onClick={handleShowAllProducts}>
          Ver más
        </Button>
      )}
    </div>
  );
};
export default CategoryPage;
