import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const AppLayout = () => {
  return (
    <>
      <Header />
      <section className="section-container">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};

export default AppLayout;
