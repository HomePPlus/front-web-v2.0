import { useEffect, useState } from "react";
// import React from "react";
import {
  getAllCommunityPosts,
  createCommunityPost,
  deleteCommunityPost,
} from "../../api/apiClient";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import Pagination from "../../components/common/Pagination/Pagination";
import FormGroup from "../../components/FormGroup/FormGroup"; // 직접 만든 FormGroup
import "./CommunityBoard.css";

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const [postsPerPage] = useState(7); // 한 페이지당 7개의 게시글로 수정
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await getAllCommunityPosts();
      setPosts(response.data.data);
      setError(null);
    } catch (error) {
      setError("게시글을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handleCreatePost = async (postData) => {
    try {
      await createCommunityPost(postData);
      await fetchPosts();
      setShowCreateForm(false);
    } catch (error) {
      console.error("게시글 생성 오류:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteCommunityPost(postId);
        await fetchPosts();
      } catch (error) {
        console.error("게시글 삭제 오류:", error);
      }
    }
  };
  console.log("Total Posts:", posts.length); // 전체 게시글 수
  console.log("Posts Per Page:", postsPerPage); // 한 페이지당 게시글 수
  console.log("Total Pages:", Math.ceil(posts.length / postsPerPage)); // 총 페이지 수

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="community-board">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <h1>입주민 커뮤니티</h1>
        <FormGroup>
          <PostList posts={currentPosts} onDelete={handleDeletePost} />{" "}
          <div className="pagination-container">
            {/* Pagination 컴포넌트 */}
            <Pagination
              totalPage={Math.ceil(posts.length / postsPerPage)} // 총 페이지 수 계산
              page={currentPage} // 현재 페이지 번호 전달
              setPage={setCurrentPage} // 페이지 변경 핸들러 전달
            />
          </div>
          
          {showCreateForm && <CreatePost onCreate={handleCreatePost} />}
        </FormGroup>
        <button
            className="write-button"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? "작성 취소" : "글쓰기"}
          </button>
      </div>
    </div>
  );
};

export default CommunityBoard;
