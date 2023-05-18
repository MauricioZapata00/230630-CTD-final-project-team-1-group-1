import Categories from "../../common/Categories";
import Products from "../../common/Products";
import Search from "../../common/Search";
import { useEffect, useState } from "react";
import { getProducts } from "../../../services";

const categories = [
  {
    image:
      "https://media.casamientosonline.com/images/2019/2/dh_eventos-catering-buenos_aires-1551233774_grande.jpg",
    title: "Casamientos",
    products: 42,
  },
  {
    image:
      "https://www.tufieston.com/dynamic/gallery/77/el-bautizo-o-la-fiesta-bienvenida.jpg",
    title: "Bautismos",
    products: 31,
  },
  {
    image:
      "https://mesadetemporada.com/wp-content/uploads/2018/10/cateringok.jpg",
    title: "Cumpleaños",
    products: 49,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA06kRY6jDA6lu6i98WBTWrGp2Ou1-_GQ0gQ&usqp=CAU",
    title: "Divorcios",
    products: 36,
  },
];

const Home = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Search />
      <Categories categories={categories} />
      <Products products={products} loading={loading} />
    </div>
  );
};

export default Home;
