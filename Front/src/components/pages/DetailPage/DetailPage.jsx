import { useParams } from "react-router-dom";
import { AppContext } from "../../../context";
import { useContext, useEffect, useState } from "react";
import ProductDetail from "../../common/ProductDetail";
import { getProductDetail, getRatingProduct } from "../../../services";
import ErrorMessage from "../../common/ErrorMessage";
import { CircularProgress } from "@mui/material";
import Product from "../../common/Product/Product";

const DetailPage = () => {
  const { id } = useParams();

  const { error, setError, rating, setRating } = useContext(AppContext);

  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    getProductDetail(id)
      .then((response) => {
        setProductDetail(response.data);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
        setLoading(false);
      })
      .finally(() => setLoading(false));

    getRatingProduct(id)
      .then((response) => {
        setRating(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [id, setRating, setError]);
  

  return (
    <div className="detail-page">
      <div className="detail-page__loading">
        {loading && <CircularProgress />}
      </div>
      {productDetail && (
        <ProductDetail
          productDetail={productDetail}
          loading={loading}
          rating={rating}
        />
      )}
      {!loading && !productDetail && (
        <div className="detail-page__empty">
          No es posible mostrar la información del producto
        </div>
      )}
      {error && <ErrorMessage />}
    </div>
  );
};

export default DetailPage;
