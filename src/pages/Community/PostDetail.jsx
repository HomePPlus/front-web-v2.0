// src/components/community/PostDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getCommunityPost,
  deleteCommunityPost,
  getCommunityComments,
  createCommunityComment,
} from '../../api/apiClient';
import CommentList from './CommentList';
import FormGroup from '../../components/FormGroup/FormGroup';
import './CommunityBoard.css';
import Loading from '../../components/common/Loading/Loading';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      console.group('PostDetail - 데이터 로딩');
      try {
        console.log('게시글 ID:', postId);
        const postResponse = await getCommunityPost(postId);
        console.log('게시글 응답:', postResponse);
        
        const commentsResponse = await getCommunityComments(postId);
        console.log('댓글 응답:', commentsResponse);

        setPost(postResponse.data.data);
        setComments(commentsResponse.data.data);
        console.log('데이터 설정 완료');
      } catch (error) {
        console.error('데이터 로딩 에러:', error);
        setError('게시글을 불러오는데 실패했습니다.');
      } finally {
        console.log('로딩 상태 해제');
        setLoading(false);
      }
      console.groupEnd();
    };

    fetchData();
  }, [postId]);

  const handleDeletePost = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteCommunityPost(postId);
        navigate('/community');
      } catch (error) {
        console.error('게시글 삭제 오류:', error);
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
      setNewComment('');
    } catch (error) {
      console.error('댓글 작성 오류:', error);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error">{error}</div>;
  if (!post) return null;

  return (
    <div className="post-detail-container">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '100px',
        }}
      >
        <h1>입주민 커뮤니티</h1>
        <FormGroup>
          <div className="post-header">
            <h1>{post.communityTitle}</h1>
            <div className="post-meta">
              <span className="author">{post.userName}</span>
              <span className="date">작성일: {new Date(post.communityCreatedAt).toLocaleDateString('ko-KR')}</span>
              {post.communityUpdatedAt !== post.communityCreatedAt && (
                <span className="date">수정일: {new Date(post.communityUpdatedAt).toLocaleDateString('ko-KR')}</span>
              )}
              <span className="views">조회수: {post.communityViews}</span>
            </div>
          </div>

          <div className="post-content">
            <p>{post.communityContent}</p>
          </div>

          <div className="post-actions">
            <button onClick={() => navigate('/community')} className="list-button">
              목록으로
            </button>
            <button onClick={handleDeletePost} className="delete-button">
              삭제
            </button>
          </div>

          {/* <div className="comment-section">
            <h3>댓글 ({comments.length})</h3>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="댓글을 입력하세요"
                required
              />
              <button type="submit">확인</button>
            </form>
            <CommentList comments={comments} />
          </div> */}
        </FormGroup>
      </div>
    </div>
  );
};

export default PostDetail;
