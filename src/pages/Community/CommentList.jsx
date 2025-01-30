// src/components/community/CommentList.jsx
import React from "react";
import CommentItem from "./CommentItem";
import "./CommunityBoard.css";

const CommentList = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem key={comment.commentId} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
