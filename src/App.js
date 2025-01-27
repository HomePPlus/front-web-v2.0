import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import MainPage from "./pages/MainPage";
import { GlobalStyle } from './styles/GlobalStyle';
import Login from './pages/Login/Login';
import InspectorDashboard from './pages/Dashboard/InspectorDashboard';

function App() {
  const navLinks = ['신고하기', '커뮤니티', '로그인&회원가입', '인스타그램']
    .map(label => ({url: '#', label}));

  return (
    <>
      <GlobalStyle />
      <Router>
        <Header navLinks={navLinks} />
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
