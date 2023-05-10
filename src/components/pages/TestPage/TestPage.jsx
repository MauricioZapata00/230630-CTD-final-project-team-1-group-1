import { useContext } from "react";
import TestComponent from "../../common/TestComponent";
import { AppContext } from "../../../context";

const TestPage = () => {
  const { logedUser } = useContext(AppContext);

  console.log({ logedUser });

  return (
    <div>
      <h1>Página de prueba</h1>
      <TestComponent />
    </div>
  );
};

export default TestPage;
