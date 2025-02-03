import React from "react";
import CommunityPostForm from "../../components/CommunityPost/CommunityPostForm";
import "./CreateCommunityPost.css";

const CreateCommunityPost = () => {
  return (
    <div className="report-wrapper">
      <div className="community-container">
        <CommunityPostForm />
      </div>
    </div>
  );
};

export default CreateCommunityPost;
