// src/components/community/PostList.jsx
import React from "react";
import PostItem from "./PostItem";
import "./CommunityBoard.css";

const PostList = ({ posts, onDelete }) => {
  return (
    <table className="post-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>글쓴이</th>
          <th>작성일</th>
          <th>조회수</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <PostItem
            key={post.communityPostId}
            post={post}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default PostList;
