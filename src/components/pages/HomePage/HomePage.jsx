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

// import { useEffect, useState } from "react";
// import InputProduct from "../../forms/InputProduct/InputProduct";
// import { Button } from "@mui/material";
// import axios from "axios";

// const Home = () => {

//   const [openDialog, setOpenDialog] = useState(false)

//   const [products, setProducts] = useState([])

//   const [productImages, setProductImages] = useState([])

//   const handleClick = () => {
//     setOpenDialog(() => true)
//   }

//   const getProducts = async () => {
//     const fetchedProducts = await axios.get('http://localhost:8080/productos/')
//       .then(response => response.data)
//       .catch(error => console.log(error))
//     setProducts(() => fetchedProducts)
//     fetchedProducts.forEach((product) => {
//       showSingleImage(product.imagen, product.id);
//     })
//   }

//   const showSingleImage = (image, id) => {
//     const imageToShowBlob = new Blob([image], { type: "image/png" })
//     const fileReader = new FileReader()
//     // const elementToModify = document.getElementById('' + id)
//     // console.log('elementToModify', elementToModify)
//     fileReader.readAsDataURL(imageToShowBlob);
//     fileReader.onloadend = (event) => {
//       console.log(event)
//       setProductImages((prevImages) => ([
//         ...prevImages, event.explicitOriginalTarget.result
//       ]))
//       console.log('fileReader.result', fileReader.result)
//     }

    
//     // fileReader.readAsDataURL(imageToShowBlob)
//     // fileReader.onloadend = () => {
//     //   elementToModify.src = fileReader.result
//     //   setProductUrlBase64(() => fileReader.result)
//     // }
//   }

//   useEffect(() => {
//     getProducts()
//   }, [])

//   useEffect(() => {
//     // const loadProductImages = () => {
//     //   const updatedProductImages = products.map((product) => {
//     //     const imageToShowBlob = new Blob([product.imagen], { type: 'image/png' })
//     //     const fileReader = new FileReader()

//     //     return new Promise((resolve, reject) => {
//     //       fileReader.onloadend = () => {
//     //         resolve(fileReader.result)
//     //       };
//     //       fileReader.onerror = reject
//     //       fileReader.readAsDataURL(imageToShowBlob)
//     //     })
//     //   })

//     //   Promise.all(updatedProductImages)
//     //     .then((results) => setProductImages(results))
//     //     .catch((error) => console.error('Error loading product images:', error))
//     // }
//     // loadProductImages()
//     console.log('productos: ', products)
//     console.log('productImages', productImages)
//     products.forEach((product) => {
//       showSingleImage(product.imagen, product.id);
//     })
//   }, [products])

//   return (
//     <div>
//       Página principal
//       <Button variant="contained" color="success" onClick={handleClick}>Crear producto</Button>
//       <InputProduct isOpenDialog={openDialog} setIsOpenDialog={setOpenDialog} />
//       <div>
//         {/* {products.map((product, index) => (
//           <img
//             key={product.id}
//             id={product.id}
//             src={product.descripcion}
//             alt={`Product ${product.id}`}
//           />
//         ))} */}
//       </div>
//     </div>
//   );
// };

// export default Home;
