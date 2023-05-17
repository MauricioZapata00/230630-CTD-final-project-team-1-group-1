const Home = () => {
  return <div>Página principal</div>;
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
