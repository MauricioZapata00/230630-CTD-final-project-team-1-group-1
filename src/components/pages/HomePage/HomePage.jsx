import Categories from "../../common/Categories";
import Products from "../../common/Products";
import Search from "../../common/Search";

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

const products = [
  {
    image:
      "https://http2.mlstatic.com/D_NQ_NP_976413-MLA45362229964_032021-O.jpg",
    name: "Finger Food",
    price: 4800,
  },
  {
    image:
      "https://www.bsas-catering.com.ar/documentos/1/11_servicio-de-pasta-party.jpg",
    name: "Menú de Pastas",
    price: 3550,
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSahWphFdPSIg0xWp3W-xLR0i9FQwNoTGeKMA&usqp=CAU",
    name: "Bebidas",
    price: 1900,
  },
  {
    image:
      "https://cdn0.casamientos.com.ar/vendor/3739/3_2/960/jpeg/aaea4718-2d78-4de6-94ae-e98f1fa97cf8_7_153739-159146789464383.jpeg",
    name: "Mesa dulce",
    price: 1000,
  },
];

const Home = () => {
  return (
    <div>
      <Search />
      <Categories categories={categories} />
      <Products products={products} />
    </div>
  );
};

export default Home;
