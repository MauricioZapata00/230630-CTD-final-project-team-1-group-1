import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContextProvider from "./context";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DetailPage from "./components/pages/DetailPage";
import RegisterPage from "./components/pages/RegisterPage";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";
import AdminListProducts from "./components/pages/AdminListProducts/AdminListProducts";
import AdminCreateProduct from "./components/pages/AdminCreateProduct/AdminCreateProduct";
import AdminLayout from "./components/layout/AdminLayout";
import CategoryPage from "./components/pages/CategoryPage/CategoryPage";
import UserPage from "./components/pages/UserPage/UserPage";
import AdminEditProduct from "./components/pages/AdminEditProduct/AdminEditProduct";
import AdminListUsers from "./components/pages/AdminListUsers/AdminListUsers";
import BookingsPage from "./components/pages/BookingsPage/BookingsPage";
import BookingDetailPage from "./components/pages/BookingDetailPage/BookingDetailPage";

const App = () => {
  return (
    <div className="app">
      <ThemeContextProvider>
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/registro" element={<RegisterPage />} />
                <Route path="/ingreso" element={<LoginPage />} />
                <Route path="/detalle/:id" element={<DetailPage />} />
                <Route path="/categoria/:id" element={<CategoryPage />} />
                <Route path="/usuario" element={<UserPage />} />
                <Route path="/reservas" element={<BookingsPage />} />
                <Route path="/reservas/:id" element={<BookingDetailPage />} />
              </Route>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminListProducts />} />
                <Route
                  path="/admin/crear-producto"
                  element={<AdminCreateProduct />}
                />
                <Route
                  path="/admin/editar-producto/:id"
                  element={<AdminEditProduct />}
                />
                <Route
                  path="/admin/listar-usuarios"
                  element={<AdminListUsers />}
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </ThemeContextProvider>
    </div>
  );
};

export default App;
