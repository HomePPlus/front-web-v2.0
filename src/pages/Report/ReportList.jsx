import { useEffect, useState } from "react";
// import React from "react";
import { useNavigate } from "react-router-dom";
// import {
//   getAllCommunityPosts,
//   createCommunityPost,
//   deleteCommunityPost,
// } from "../../api/apiClient";
import PostList from "../Community/PostList";
import CreatePost from "../Community/CreatePost";
import Pagination from "../../components/common/Pagination/Pagination";
import FormGroup from "../../components/FormGroup/FormGroup";
import "./ReportList.css";

const dummyReports = [
  {
    communityPostId: 1,
    communityTitle: "테스트 게시글 1",
    communityContent: "내용 1",
    communityViews: 100,
    communityCreatedAt: new Date("2023-10-01").toISOString(),
    userName: "사용자1",
  },
  {
    communityPostId: 2,
    communityTitle: "테스트 게시글 2",
    communityContent: "내용 2",
    communityViews: 200,
    communityCreatedAt: new Date("2023-10-02").toISOString(),
    userName: "사용자2",
  },
  {
    communityPostId: 3,
    communityTitle: "테스트 게시글 3",
    communityContent: "내용 3",
    communityViews: 200,
    communityCreatedAt: new Date("2023-10-03").toISOString(),
    userName: "사용자3",
  },
];

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(7);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setReports(dummyReports);
      setLoading(false);
    } catch (err) {
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  }, []);

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  const handleCreateReport = (reportData) => {
    const newReport = {
      communityReportId: reports.length + 1,
      communityTitle: reportData.title,
      communityContent: reportData.content,
      communityViews: 0,
      communityCreatedAt: new Date().toISOString(),
      userName: "작성자",
    };
    setReports([...reports, newReport]);
    setShowCreateForm(false);
  };

  const handleDeleteReport = (reportId) => {
    const updatedReports = reports.filter(
      (report) => report.communityReportId !== reportId
    );
    setReports(updatedReports);
  };

  const navigate = useNavigate();

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="report-board">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <h1>신고 내역</h1>
        <FormGroup>
          <PostList posts={currentReports} onDelete={handleDeleteReport} />
          <div className="pagination-container-report">
            <Pagination
              totalPage={Math.ceil(reports.length / reportsPerPage)}
              page={currentPage}
              setPage={setCurrentPage}
            />
          </div>
          {showCreateForm && <CreatePost onCreate={handleCreateReport} />}
        </FormGroup>
        <button className="button-report" onClick={() => navigate("/report")}>
          신고하기
        </button>
      </div>
    </div>
  );
};

export default ReportList;
