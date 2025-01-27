import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import MainPage from "./pages/MainPage";
// import { GlobalStyle } from './styles/GlobalStyle';
import Login from './pages/Login/Login';

function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
