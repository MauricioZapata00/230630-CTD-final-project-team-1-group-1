import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContextProvider from "./context";
import AppLayout from "./components/layout/AppLayout";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DetailPage from "./components/pages/DetailPage";
import RegisterPage from "./components/pages/RegisterPage";

const App = () => {
  return (
    <div className="app">
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/registro" element={<RegisterPage />} />
              <Route path="/ingreso" element={<LoginPage />} />
              <Route path="/detalle" element={<DetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </div>
  );
};

export default App;
