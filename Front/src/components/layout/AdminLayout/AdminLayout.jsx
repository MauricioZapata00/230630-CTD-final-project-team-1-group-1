import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import SuccessMessage from "../../common/SuccessMessage";
import ErrorMessage from "../../common/ErrorMessage";
import { useContext } from "react";
import { AppContext } from "../../../context";

const AdminLayout = () => {
  const { success, error } = useContext(AppContext);

  return (
    <>
      <Header admin />
      <section className="section-container">
        <Outlet />
      </section>
      {success && <SuccessMessage />}
      {error && <ErrorMessage />}
    </>
  );
};

export default AdminLayout;
