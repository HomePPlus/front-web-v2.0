// src/components/community/PostItem.jsx
import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./CommunityBoard.css";

const PostItem = ({ post, onDelete }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd HH:mm");
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
