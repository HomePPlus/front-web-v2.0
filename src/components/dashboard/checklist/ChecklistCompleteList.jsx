import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChecklistCompleteList.css';
import { downloadChecklist } from '../../../api/apiClient';
import { useAlert } from "../../../contexts/AlertContext";
import Loading from "../../common/Loading/Loading";
import { MdDownload, MdDelete, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const ChecklistCompleteList = () => {
  const [completedChecklists, setCompletedChecklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    loadCompletedChecklists();
  }, []);

  const loadCompletedChecklists = () => {
    try {
      const savedChecklists = JSON.parse(localStorage.getItem('completedChecklists') || '[]');
      setCompletedChecklists(savedChecklists);
    } catch (error) {
      console.error('체크리스트 로딩 실패:', error);
      showAlert('완료된 체크리스트를 불러오는데 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 검색 및 필터링된 체크리스트
  const filteredChecklists = completedChecklists.filter(checklist =>
    checklist.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checklist.inspector_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredChecklists.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredChecklists.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 결함 유형 변환 함수
  const translateDefectType = (type) => {
    const defectTypeMap = {
      'Crack': '균열',
      'Leak/Efflorescence': '누수/백태',
      'Steel Corrosion': '강재 부식',
      'Spalling': '박리',
      'Rebar Exposure': '철근 노출',
      'PaintDamage': '도장 손상',
      'crack': '균열',
      'leak': '누수/백태',
      'steel': '강재 부식',
      'spalling': '박리',
      'rebar': '철근 노출',
      'paint': '도장 손상',
      'normal': '정상',
    };
    return defectTypeMap[type] || type;
  };

  const handleDownloadReport = async (inspectionId) => {
    if (!inspectionId) {
      await showAlert('다운로드할 보고서 정보가 없습니다.', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await downloadChecklist(inspectionId);
      
      // Blob 생성 및 다운로드
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `checklist_${inspectionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      await showAlert('보고서가 성공적으로 다운로드되었습니다.', 'success');
    } catch (error) {
      console.error('보고서 다운로드 실패:', error);
      await showAlert('보고서 다운로드에 실패했습니다.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChecklist = async (inspectionId) => {
    try {
      const savedChecklists = JSON.parse(localStorage.getItem('completedChecklists') || '[]');
      const updatedChecklists = savedChecklists.filter(
        checklist => checklist.inspection_id !== inspectionId
      );
      localStorage.setItem('completedChecklists', JSON.stringify(updatedChecklists));
      setCompletedChecklists(updatedChecklists);
      await showAlert('체크리스트가 삭제되었습니다.', 'success');
    } catch (error) {
      console.error('체크리스트 삭제 실패:', error);
      await showAlert('체크리스트 삭제에 실패했습니다.', 'error');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="completed-checklist-container">
      <div className="checklist-header">
        <h2>완료된 체크리스트 목록</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="주소 또는 점검자 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredChecklists.length === 0 ? (
        <div className="no-completed-checklists">
          완료된 체크리스트가 없습니다.
        </div>
      ) : (
        <>
          <div className="checklist-grid">
            {currentItems.map((checklist) => (
              <div key={checklist.inspection_id} className="checklist-card">
                <div className="card-header">
                  <span className="inspection-id">ID: {checklist.inspection_id}</span>
                  <span className="inspection-date">{checklist.inspection_date}</span>
                </div>
                <div className="card-body">
                  <h3>{checklist.address}</h3>
                  <p className="inspector">점검자: {checklist.inspector_name}</p>
                  <div className="defect-tags">
                    {checklist.defect_types.map((defect, index) => (
                      <span key={index} className="defect-tag">{defect}</span>
                    ))}
                  </div>
                </div>
                <div className="card-actions">
                  <button 
                    onClick={() => handleDownloadReport(checklist.inspection_id)}
                    className="action-btn download"
                    disabled={loading}
                  >
                    <MdDownload /> {loading ? '다운로드 중' : '보고서'}
                  </button>
                  <button 
                    onClick={() => handleDeleteChecklist(checklist.inspection_id)}
                    className="action-btn delete"
                    disabled={loading}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="page-btn"
              >
                <MdNavigateBefore />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="page-btn"
              >
                <MdNavigateNext />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChecklistCompleteList; 