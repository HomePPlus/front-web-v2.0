import React, { useEffect, useState } from "react";
import "./Pagination.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ totalPage, page, setPage }) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const generatePageNumbers = () => {
      // 항상 1부터 5까지 표시
      const numbers = [1, 2, 3, 4, 5];
      setPageNumbers(numbers);
    };

    generatePageNumbers();
  }, []); // 의존성 배열을 비워서 한 번만 실행되도록 설정

  return (
    <div id="pag-cover">
      <div id="pg-links">
        {/* 왼쪽 화살표 */}
        <div
          className={`arrow ${page === 1 ? "disabled" : ""}`}
          onClick={() => page > 1 && setPage(page - 1)}
        >
          <FontAwesomeIcon icon={faAngleDoubleLeft} />{" "}
        </div>
        {pageNumbers.map((num) => (
          <div
            key={num}
            className={`pg-link ${num === page ? "active" : ""}`}
            onClick={() => num <= totalPage && setPage(num)} // totalPage 체크 추가
          >
            <span>{num}</span>
          </div>
        ))}

        {/* 오른쪽 화살표 */}
        <div
          className={`arrow ${page === totalPage ? "disabled" : ""}`}
          onClick={() => page < totalPage && setPage(page + 1)}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
