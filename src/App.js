import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header/Header";
import MainPage from "./pages/MainPage";
import Auth from './pages/Auth/Auth';
import Test from './pages/Test/Test';
import Report from "./pages/Report/Report";
import Layout from './components/layout/Layout';

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
        </Routes>
      </Layout>
    </Router>
  );
}


export default App;
