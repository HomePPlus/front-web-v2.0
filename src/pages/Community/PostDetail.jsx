// src/components/community/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getCommunityPost,
  deleteCommunityPost,
  getCommunityComments,
  createCommunityComment,
} from "../../api/apiClient";
import CommentList from "./CommentList";
import "./CommunityBoard.css";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await getCommunityPost(postId);
        const commentsResponse = await getCommunityComments(postId);

        setPost(postResponse.data.data);
        setComments(commentsResponse.data.data);
        setError(null);
      } catch (error) {
        setError("게시글을 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  const handleDeletePost = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteCommunityPost(postId);
        navigate("/community");
      } catch (error) {
        console.error("게시글 삭제 오류:", error);
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await createCommunityComment(postId, {
        commentContent: newComment,
      });
      setComments([...comments, response.data.data]);
      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 오류:", error);
    }
  };

  if (loading) return <div className="loading">로딩 중...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return null;

  return (
    <div className="post-detail-container">
      <div className="post-header">
        <h1>{post.communityTitle}</h1>
        <div className="post-meta">
          <span className="author">{post.userName}</span>
          <span className="date">
            작성일:{" "}
            {new Date(post.communityCreatedAt).toLocaleDateString("ko-KR")}
          </span>
          {post.communityUpdatedAt !== post.communityCreatedAt && (
            <span className="date">
              수정일:{" "}
              {new Date(post.communityUpdatedAt).toLocaleDateString("ko-KR")}
            </span>
          )}
          <span className="views">조회수: {post.communityViews}</span>
        </div>
      </div>

      <div className="post-content">
        <p>{post.communityContent}</p>
      </div>

      <div className="post-actions">
        <button onClick={() => navigate("/community")} className="list-button">
          목록으로
        </button>
        <button onClick={handleDeletePost} className="delete-button">
          삭제
        </button>
      </div>

      <div className="comment-section">
        <h3>댓글 ({comments.length})</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            required
          />
          <button type="submit">댓글 작성</button>
        </form>
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

export default PostDetail;
