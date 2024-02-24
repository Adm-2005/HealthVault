import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import  About  from "./pages/About";
import  Home  from "./pages/Home";
import  Users  from "./pages/Users";


export default function App() {
  return (
    <Router>
      <div>
     

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
         <Route path="/" element={<Home />}></Route>
         <Route path="/About" element={<About />}></Route>
         <Route path="/Users" element={<Users />}></Route>
         </Routes>
      </div>
    </Router>
  );
}