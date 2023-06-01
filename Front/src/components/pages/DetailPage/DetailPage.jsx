import { useParams } from "react-router-dom";
import { AppContext } from "../../../context";
import { useContext, useEffect, useState } from "react";
import ProductDetail from "../../common/ProductDetail";
import { getProductDetail } from "../../../services";
import ErrorMessage from "../../common/ErrorMessage";
import { CircularProgress } from "@mui/material";

const DetailPage = () => {
  const { id } = useParams();

  const { error, setError } = useContext(AppContext);

  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

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
  }, [id, setError]);

  return (
    <div className="detail-page">
      <div className="detail-page__loading">
        {loading && <CircularProgress />}
      </div>
      {productDetail && (
        <ProductDetail productDetail={productDetail} loading={loading} />
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
