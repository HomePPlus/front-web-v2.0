// src/components/community/PostItem.jsx
// import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./CommunityBoard.css";

const PostItem = ({ post, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return ''; // 유효하지 않은 날짜인 경우 빈 문자열 반환
      }
      return format(date, 'yyyy-MM-dd HH:mm');
    } catch (error) {
      console.error('Date formatting error:', error);
      return '';
    }
  };

  return (
    <tr className="post-row">
      <td>{post.communityPostId}</td>
      <td className="post-title">
        <Link to={`/community/${post.communityPostId}`}>
          {post.communityTitle}
        </Link>
      </td>
      <td>{post.userName}</td>
      <td>{formatDate(post.communityCreatedAt)}</td>
      <td>{post.communityViews}</td>
      <td>
        <button
          onClick={() => onDelete(post.communityPostId)}
          className="delete-button"
        >
          삭제
        </button>
      </td>
    </tr>
  );
};

export default PostItem;
