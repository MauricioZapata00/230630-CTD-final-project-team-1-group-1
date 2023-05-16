import Categories from "../../common/Categories";
import Products from "../../common/Products";
import Search from "../../common/Search";

const categories = [
  {
    image:
      "data:image/jpeg;base64,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",
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
  return (
    <div>
      <Search />
      <Categories categories={categories} />
      <Products />
    </div>
  );
};

export default Home;
