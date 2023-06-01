import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SuccessMessage from "../../common/SuccessMessage";
import ErrorMessage from "../../common/ErrorMessage";
import { useContext } from "react";
import { AppContext } from "../../../context";

const AppLayout = () => {
  const { success, error } = useContext(AppContext);

  return (
    <>
      <Header />
      <section className="section-container">
        <Outlet />
      </section>
      <Footer />
      {success && <SuccessMessage />}
      {error && <ErrorMessage />}
    </>
  );
};

export default AppLayout;
