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
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      });

    // setTimeout(() => {
    //   console.log({ id });
    //   setLoading(false);
    //   setProductDetail({
    //     descripcion: "desc1",
    //     id: 6,
    //     imagenUrl:
    //       "https://equipo1-c1-bucket.s3.us-east-2.amazonaws.com/1684507664613Sin%20t%C3%ADtulo.png",
    //     nombre: "prueba",
    //     precio: 100,
    //   });
    // }, 2000);
  }, [id, setError]);

  return (
    <div>
      {loading && <CircularProgress />}
      {productDetail && <ProductDetail productDetail={productDetail} />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default DetailPage;
