const Home = () => {
  return <div>Página principal</div>;
};

export default Home;
/*
import { useState } from "react";
import InputProduct from "../../forms/InputProduct/InputProduct";
import { Button } from "@mui/material";

const Home = () => {

  const [openDialog, setOpenDialog] = useState(false)

  const handleClick = () => {
    setOpenDialog(() => true)
  }
  return (
  <div>
    Página principal
    <Button variant="contained" color="success" onClick={handleClick}>Crear producto</Button>
    <InputProduct isOpenDialog={openDialog} setIsOpenDialog={setOpenDialog} />
  </div>
  );
};

export default Home;
*/