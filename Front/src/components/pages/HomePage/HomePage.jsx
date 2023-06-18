import Categories from "../../common/Categories";
import Products from "../../common/Products";
import Search from "../../common/Search";
import React,{ useContext, useEffect, useState } from "react";
import { getProducts, getCategories } from "../../../services";
import { AppContext } from "../../../context";
import Pagination from "../../common/Pagination";

const Home = () => {
  const { setError } = useContext(AppContext);

  const [categories, setCategories] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);


  useEffect(() => {
    setCategoriesLoading(true);
    getCategories()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      })
      .finally(() => setCategoriesLoading(false));
  }, [setError]);

  useEffect(() => {
    setProductsLoading(true);
    getProducts(currentPage)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.description;
        setError(errorMsg || "Ha ocurrido un error.");
      })
      .finally(() => setProductsLoading(false));
  }, [currentPage,setError]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleResetPage = () => {
    setCurrentPage(0);
  };

  const handleLastPage = () => {
    setCurrentPage(2);
  };
  return (
    <div>
      <Search />
      <Categories categories={categories} loading={categoriesLoading} />
      <Products
        products={products}
        loading={productsLoading}
        title="Productos recomendados"
      />
      <Pagination
       currentPage={currentPage}
       handleNextPage={handleNextPage}
       handlePrevPage={handlePrevPage}
       handleResetPage ={handleResetPage}
       handleLastPage={handleLastPage}
       />
    </div>
  );
};

export default Home;
