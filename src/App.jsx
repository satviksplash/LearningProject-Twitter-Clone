import { Routes, Route, useNavigate } from "react-router-dom";
import Authentication from "./components/Authentication/Authentication";
import Homepage from "./components/homepage/Homepage";
import { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./Store/Auth/Action";


function App() {

  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const  navigate = useNavigate()

  useEffect(()=>{
    if(jwt){
      //  dispath
      dispatch(getUserProfile(jwt));
      console.log("auth.user : ", auth.user);
      navigate("/");
      
    }
  }, [auth.jwt])

  return (
    <div className=" ">
      <Routes>
        <Route path="/*" element={auth.user ? <Homepage /> : <Authentication/>} />
      </Routes>
    </div>
  );
}

export default App;
