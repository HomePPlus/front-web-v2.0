// CommunityBoard.jsx
import React, { useEffect, useState } from "react";
import {
  getAllCommunityPosts,
  createCommunityPost,
  deleteCommunityPost,
} from "../../api/apiClient";
import PostList from "./PostList";
import CreatePost from "./CreatePost";
import "./CommunityBoard.css";

const CommunityBoard = () => {
  const [posts, setPosts] = useState([]);
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

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="community-board">
      <h1>입주민 커뮤니티</h1>

      <PostList posts={posts} onDelete={handleDeletePost} />

      <div className="write-button-container">
        <button
          className="write-button"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "작성 취소" : "글쓰기"}
        </button>
      </div>

      {showCreateForm && <CreatePost onCreate={handleCreatePost} />}
    </div>
  );
};

export default CommunityBoard;
