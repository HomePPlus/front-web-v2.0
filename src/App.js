import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import MainPage from "./pages/MainPage";
// import { GlobalStyle } from './styles/GlobalStyle';
import Login from "./pages/Login/Login";
import Report from "./pages/Report/Report";

function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
