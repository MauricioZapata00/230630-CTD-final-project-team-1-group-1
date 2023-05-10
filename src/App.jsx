import TestPage from "./components/pages/TestPage/TestPage";
import AppContextProvider from "./context";

const App = () => {
  return (
    <AppContextProvider>
      <TestPage />
    </AppContextProvider>
  );
};

export default App;
