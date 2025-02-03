import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";
import Auth from "./pages/Auth/Auth";
import Test from "./pages/Test/Test";
import Report from "./pages/Report/Report";
import CommunityBoard from "./pages/Community/CommunityBoard";
import PostDetail from "./pages/Community/PostDetail";
import NaverMap from "./components/map/NaverMap";
import HealthCheck from "./HealthCheck";
import CreateCommunityPost from "./pages/Community/CreateCommunityPost";

function App() {
  return (
    <Router>
      <Layout>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/test" element={<Test />} />
          <Route path="/report" element={<Report />} />
          <Route path="/community" element={<CommunityBoard />} />
          <Route path="/community/:postId" element={<PostDetail />} />
          <Route path="/map" element={<NaverMap />} />
          <Route path="/health" element={<HealthCheck />} />
          <Route path="/create-post" element={<CreateCommunityPost />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
