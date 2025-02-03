import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import MainPage from "./pages/MainPage";
import Auth from "./pages/Auth/Auth";
import TestPage from "./pages/TestPage";
import Report from "./pages/Report/Report";
import CommunityBoard from "./pages/Community/CommunityBoard";
import PostDetail from "./pages/Community/PostDetail";
import NaverMap from "./components/map/NaverMap";
import HealthCheck from "./HealthCheck";
import CreateCommunityPost from "./pages/Community/CreateCommunityPost";
import DefectStats from "./components/dashboard/DefectStats";
import ProtectedInspectorRoute from "./components/auth/ProtectedInspectorRoute";
import InspectionTable from "./components/inspection/InspectionTable";
import InspectionStats from "./components/inspection/InspectionStats";
import TodayInspection from "./components/inspection/TodayInspection";
import MiniCalendar from "./components/common/Calendar/MiniCalendar";
import Dashboard2 from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/report" element={<Report />} />
          <Route path="/community" element={<CommunityBoard />} />
          <Route path="/community/:postId" element={<PostDetail />} />
          <Route path="/map" element={<NaverMap />} />
          <Route path="/health" element={<HealthCheck />} />
          <Route path="/dashboard2" element={<Dashboard2 />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedInspectorRoute>
                <DefectStats />
                <InspectionTable />
                <InspectionStats />
                <TodayInspection />
                <MiniCalendar />
              </ProtectedInspectorRoute>
            }
          />
          <Route path="/create-post" element={<CreateCommunityPost />} />
        </Routes>
    </Router>
  );
}

export default App;
