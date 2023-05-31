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

  const [categories, setCategories] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [products, setProducts] = useState(null);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    setCategoriesLoading(true);
    getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch(() => {
        setError("Ha ocurrido un error en el servidor");
      })
      .finally(() => setCategoriesLoading(false));
  }, [setError]);

  useEffect(() => {
    setProductsLoading(true);
    getProducts()
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => {
        setError("Ha ocurrido un error en el servidor");
      })
      .finally(() => setProductsLoading(false));
  }, [setError]);

  return (
    <div>
      <Search />
      <Categories categories={categories} loading={categoriesLoading} />
      <Products
        products={products}
        loading={productsLoading}
        title="Productos recomendados"
      />
      {success && <SuccessMessage />}
      {error && <ErrorMessage />}
    </div>
  );
};

export default Home;
