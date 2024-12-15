import { useContext } from "react";


import { Routes, Route } from "react-router-dom";

import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'
import Home from "./pages/Home";
import DataContext from "./context/DataContext";



const App = () => {
  const { isLogin } = useContext(DataContext)

  return (
    <>
      {
        isLogin ?
          (
            <>
              <Home />
            </>
          )
          :
          (
            <>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </>
          )
      }

    </>)
};


export default App;
