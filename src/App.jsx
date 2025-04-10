import { Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import Homepage from "./components/homepage/Homepage";


function App() {

  return (
    <div className=" ">
      <Routes>
        <Route path="/*" element={true ? <Homepage /> : <Authentication/>} />
      </Routes>
    </div>
  );
}

export default App;
