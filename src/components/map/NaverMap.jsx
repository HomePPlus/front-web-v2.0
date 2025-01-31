import React from "react";
import { useEffect, useRef } from "react";

const NaverMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // 환경변수 체크
    if (!process.env.REACT_APP_NAVER_MAP_CLIENT_ID) {
      console.error("Naver Client ID is not defined!");
      return;
    }

    // 스크립트 동적 로드
    const script = document.createElement("script");
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}`;
    script.async = true;

    script.onload = () => {
      // 지도 초기화
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 13,
      };
      new window.naver.maps.Map(mapRef.current, mapOptions);
    };
    // 스크립트 로드 상태 확인
    script.onerror = () => {
      console.error("Failed to load Naver Maps script!");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div ref={mapRef} style={{ width: "50%", height: "500px" }} />;
};

export default NaverMap;
