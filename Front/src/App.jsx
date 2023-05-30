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
                <Route path="/admin" element={<AdminListProducts />} />
                <Route
                  path="/admin/crear-producto"
                  element={<AdminCreateProduct />}
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
