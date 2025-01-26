import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import MainPage from "./pages/MainPage";
//import MainVideo from "./pages/MainVideo/MainVideo";

import { GlobalStyle } from './styles/GlobalStyle';
import Login from './pages/Login/Login';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;