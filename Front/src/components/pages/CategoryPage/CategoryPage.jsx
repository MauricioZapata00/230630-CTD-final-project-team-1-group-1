import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryDetail } from "../../../services";
import Products from "../../common/Products";
import { Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CategoryPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

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
      <div className="category-page__title">
        <h2>
          <span>Productos de la categoría</span>
          <span>{products.length > 0 ? products[0].nombreCategoria : ""}</span>
        </h2>

        <IconButton onClick={goBack} aria-label="volver">
          <ArrowBackIcon />
        </IconButton>
      </div>
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
