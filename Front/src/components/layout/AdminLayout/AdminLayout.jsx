import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const AdminLayout = () => {
  return (
    <>
      <Header admin />
      <section className="section-container">
        <Outlet />
      </section>
    </>
  );
};

export default AdminLayout;
