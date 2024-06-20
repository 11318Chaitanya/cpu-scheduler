import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
              
                <Home />
              </>
            }
          />
          <Route
            exact
            path="/about"
            element={
              <>
                <About />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
