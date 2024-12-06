import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import SigIn from "./SigIn";
import Oyente from "./oyente";
import Buscar from "./buscar";
import Admin from "./admin";
import Modificar from "./modificar";

const MainRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/SigIn" element={<SigIn />} />
      <Route path="/oyente" element={<Oyente />} />
      <Route path="/buscar" element={<Buscar />} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/modificar" element={<Modificar/>}/>

    </Routes>
  </Router>
);

export default MainRouter;
