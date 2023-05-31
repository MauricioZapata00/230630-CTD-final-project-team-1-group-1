import { useParams } from "react-router-dom";
import { AppContext } from "../../../context";
import { useContext, useEffect, useState } from "react";
import ProductDetail from "../../common/ProductDetail";
import { getProductDetail } from "../../../services";
import ErrorMessage from "../../common/ErrorMessage";
import { CircularProgress } from "@mui/material";

const detail = {
  cantMin: 3,
  descripcion: "Entradas para disfrutar",
  id: 1,
  imagenUrl:
    "https://equipo1-c1-bucket.s3.us-east-2.amazonaws.com/1685451960783entradas-2.jpg",
  minDiasReservaPrevia: 5,
  nombre: "Entradas",
  nombreCategoria: "Casamiento",
  permiteCambios: false,
  precio: 1000,
  requierePagoAnticipado: true,
};

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
        setLoading(false);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
        setLoading(false);
        setProductDetail(detail);
      });
  }, [id, setError]);

  return (
    <div className="detail-page">
      {loading && <CircularProgress />}
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
