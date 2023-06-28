import { useParams } from "react-router-dom";
import { AppContext } from "../../../context";
import { useContext, useEffect, useState } from "react";
import ProductDetail from "../../common/ProductDetail";
import {
  getProductDetail,
  getRatingProduct,
  getProductBookings,
} from "../../../services";
import ErrorMessage from "../../common/ErrorMessage";
import { CircularProgress } from "@mui/material";

const DetailPage = () => {
  const { id } = useParams();

  const { error, setError, rating, setRating, logedUser } =
    useContext(AppContext);

  const [productDetail, setProductDetail] = useState(null);
  const [productBookings, setProductBookings] = useState(null);
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
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, [id, setRating, setError]);

  useEffect(() => {
    if (logedUser) {
      getProductBookings(id, logedUser.jwt)
        .then((response) => {
          const stringBookings = response.data.map((data) => data.fechaReserva);
          setProductBookings(stringBookings);
        })
        .catch(() => {});
    }
  }, [id, logedUser]);

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
          productBookings={productBookings}
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
