// DefectStats.jsx
import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { getDefectStats } from '../../api/apiClient';
import './dashboardCommon.css';
import './DefectStats.css';

const { Option } = Select;

// 파이 차트 색상 설정
const COLORS = [
  '#80b1e6', // 진한 파스텔 블루
  '#ffa366', // 진한 파스텔 오렌지
  '#66cc7a', // 진한 파스텔 그린
  '#ff8080', // 진한 파스텔 레드
  '#b399ff', // 진한 파스텔 퍼플
  '#d4a276', // 진한 파스텔 브라운
  '#ff99cc', // 진한 파스텔 핑크
];

// 커스텀 레이블 렌더링 함수
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.03) return null;

  return (
    <text
      x={x}
      y={y}
      fill="#104e1e"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      fontSize="20px"
      className="eLight"
    >
      {`${name} (${(percent * 100).toFixed(1)}%)`}
    </text>
  );
};

const AREA_LIST = [
  '부산시',
  '동래구',
  '해운대구',
  '수영구',
  '사하구',
  '부산진구',
  '남구',
  '북구',
  '강서구',
  '연제구',
  '사상구',
  '금정구',
  '동구',
  '서구',
  '영도구',
  '중구',
  '기장군',
];

const DefectStats = () => {
  const [selectedArea, setSelectedArea] = useState('부산시');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDefectStats(selectedArea);
        if (response.data.status === 200) {
          setStats(response.data.data);
          setError(null);
        }
      } catch (error) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [selectedArea]);

  const handleAreaChange = (value) => {
    setSelectedArea(value);
  };

  const formatDataForPieChart = (defectCounts) => {
    if (!defectCounts) return [];
    return Object.entries(defectCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-section">
      <div className="content-section">
        <div className="header-section">
          <h2 className="section-title eMedium">{selectedArea} 결함 통계</h2>
          <div className="area-selector">
            <Select value={selectedArea} onChange={handleAreaChange}>
              {AREA_LIST.map((area) => (
                <Option key={area} value={area}>
                  {area}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {stats && (
          <div className="content-wrapper">
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={formatDataForPieChart(stats.defectCounts)}
                  cx="50%"
                  cy="50%"
                  labelLine={{
                    stroke: '#104e1e',
                    strokeWidth: 1,
                    display: (props) => props.percent >= 0.03,
                  }}
                  label={renderCustomizedLabel}
                  outerRadius={130}
                  innerRadius={60}
                  paddingAngle={3}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={2}
                  stroke="#e0e5ec"
                >
                  {formatDataForPieChart(stats.defectCounts).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefectStats;
