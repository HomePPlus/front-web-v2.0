import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import MainPage from "./pages/MainPage";
// import { GlobalStyle } from './styles/GlobalStyle';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <>{/* <GlobalStyle /> */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
