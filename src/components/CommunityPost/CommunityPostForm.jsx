import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormGroup from "../FormGroup/FormGroup";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import "./CommunityPostForm.css";

const CommunityPostForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form submitted:", formData);
      navigate("/community");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("게시글 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm(
      "작성 중인 내용이 저장되지 않습니다. 정말 취소하시겠습니까?"
    );
    if (confirmCancel) {
      navigate(-1);
    }
  };

  return (
    <div className="community-post-write-container">
      <h1>글쓰기</h1>
      <FormGroup onSubmit={handleSubmit}>
        <div className="community-post-input-wrapper">
          <label>제목</label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            required
          />
        </div>

        <div className="community-post-input-wrapper">
          <label>내용</label>
          <Input
            type="textarea"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            required
          />
        </div>

        <div className="community-post-button-wrapper">
          <Button
            onClick={handleCancel}
            disabled={loading}
            className="create-community-cancel-button"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="create-community-submit-button"
          >
            작성완료
          </Button>
        </div>
      </FormGroup>
    </div>
  );
};

export default CommunityPostForm;
