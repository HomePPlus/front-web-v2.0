import React, { useState, useEffect } from "react";
import { Select } from "antd";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getDefectStats } from "../../api/apiClient";
import "./DefectStats.css";

const { Option } = Select;

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FDB462",
];

// 커스텀 레이블 렌더링 함수
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}) => {
  const RADIAN = Math.PI / 180;
  // 레이블을 원의 바깥쪽으로 더 멀리 배치
  const radius = outerRadius * 1.2;

  // 중심각을 기준으로 레이블의 위치 계산
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // 퍼센트가 3% 미만인 경우 레이블 생략
  if (percent < 0.03) {
    return null;
  }

  return (
    <text
      x={x}
      y={y}
      fill="#000"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12px"
    >
      {`${name} (${(percent * 100).toFixed(1)}%)`}
    </text>
  );
};

const AREA_LIST = [
  "부산시",
  "동래구",
  "해운대구",
  "수영구",
  "사하구",
  "부산진구",
  "남구",
  "북구",
  "강서구",
  "연제구",
  "사상구",
  "금정구",
  "동구",
  "서구",
  "영도구",
  "중구",
  "기장군",
];

const DefectStats = () => {
  const [selectedArea, setSelectedArea] = useState("부산시");
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
        setError("데이터를 불러오는데 실패했습니다.");
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, [selectedArea]);

  const handleAreaChange = (value) => {
    setSelectedArea(value);
  };

  // 파이 차트 데이터 포맷 변환
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
    <div className="defect-stats-container">
      <div className="area-selector">
        <Select
          value={selectedArea}
          onChange={handleAreaChange}
          style={{ width: 200 }}
        >
          {AREA_LIST.map((area) => (
            <Option key={area} value={area}>
              {area}
            </Option>
          ))}
        </Select>
      </div>

      {stats && (
        <div className="stats-display">
          <h2>{selectedArea} 결함 통계</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={formatDataForPieChart(stats.defectCounts)}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={renderCustomizedLabel}
                  outerRadius={130}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {formatDataForPieChart(stats.defectCounts).map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* <div className="stats-grid">
            {Object.entries(stats.defectCounts).map(([defectType, count]) => (
              <div key={defectType} className="stat-item">
                <h3>{defectType}</h3>
                <p>{count}건</p>
              </div>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default DefectStats;
