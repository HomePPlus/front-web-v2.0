import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import MainPage from "./pages/MainPage";
// import { GlobalStyle } from './styles/GlobalStyle';
import Login from "./pages/Login/Login";
import CommunityBoard from "./pages/Community/CommunityBoard";
import PostDetail from "./pages/Community/PostDetail";

function App() {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/community" element={<CommunityBoard />} />
          <Route path="/community/:postId" element={<PostDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
