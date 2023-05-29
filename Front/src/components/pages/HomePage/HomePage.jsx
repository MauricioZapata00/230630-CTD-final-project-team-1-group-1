import Categories from "../../common/Categories";
import Products from "../../common/Products";
import Search from "../../common/Search";
import { useContext, useEffect, useState } from "react";
import { getProducts, getCategories } from "../../../services";
import { AppContext } from "../../../context";
import SuccessMessage from "../../common/SuccessMessage";
import ErrorMessage from "./../../common/ErrorMessage";

const Home = () => {
  const { success, error, setError } = useContext(AppContext);

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Ha ocurrido un error en el servidor");
        setLoading(false);
      });
  }, [setError]);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Ha ocurrido un error en el servidor");
        setLoading(false);
      });
  }, [setError]);

  return (
    <div>
      <Search />
      <Categories categories={categories} loading={loading} />
      <Products products={products} loading={loading} />
      {success && <SuccessMessage />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default Home;
