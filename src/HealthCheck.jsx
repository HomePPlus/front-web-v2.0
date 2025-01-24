import React, { useEffect, useState } from "react";
import { checkServerHealth } from "./api/apiClient";

function HealthCheck() {
  const [isServerHealthy, setIsServerHealthy] = useState(false);

  useEffect(() => {
    checkServerHealth().then((isHealthy) => {
      setIsServerHealthy(isHealthy);
    });
  }, []);

  return <div>{isServerHealthy ? "서버 연결 성공" : "서버 연결 실패"}</div>;
}

export default HealthCheck;
