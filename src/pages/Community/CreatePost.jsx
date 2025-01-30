import React, { useState } from "react";
import "./CommunityBoard.css";

const CreatePost = ({ onCreate }) => {
  const [postData, setPostData] = useState({
    communityTitle: "",
    communityContent: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    onCreate(postData);
    setPostData({ communityTitle: "", communityContent: "" });
  };

  return (
    <div className="create-post">
      <h2>새 게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={postData.communityTitle}
          onChange={(e) =>
            setPostData({ ...postData, communityTitle: e.target.value })
          }
          required
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={postData.communityContent}
          onChange={(e) =>
            setPostData({ ...postData, communityContent: e.target.value })
          }
          required
        />
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
};

export default CreatePost;
