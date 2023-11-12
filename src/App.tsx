import NavbarComponent from "./components/NavbarComponent";
import {Outlet} from "react-router-dom"

function App() {
  return (
    <>
      <NavbarComponent />

      <div className="mx-5 my-6">
        <Outlet/>
      </div>
    </>
  );
}

export default App;
