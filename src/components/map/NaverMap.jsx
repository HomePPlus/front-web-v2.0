import React, { useEffect, useRef, useState } from "react";
import { getInspectionReports } from "../../api/apiClient";
import "./NaverMap.css";

const NaverMap = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 주소를 좌표로 변환하는 함수
  const getCoordinatesFromAddress = async (address) => {
    return new Promise((resolve, reject) => {
      if (!window.naver || !window.naver.maps || !window.naver.maps.Service) {
        reject(new Error("Naver Maps Service is not loaded"));
        return;
      }

      window.naver.maps.Service.geocode(
        {
          query: address,
        },
        function (status, response) {
          if (status === window.naver.maps.Service.Status.ERROR) {
            reject(new Error("Geocoding failed"));
            return;
          }
          if (response.v2.meta.totalCount === 0) {
            reject(new Error("No results found"));
            return;
          }
          const item = response.v2.addresses[0];
          const point = new window.naver.maps.LatLng(item.y, item.x);
          resolve(point);
        }
      );
    });
  };

  // 점검 목록을 가져와서 마커 생성
  const createMarkers = async () => {
    try {
      const response = await getInspectionReports();
      const inspections = response.data.data;

      // 기존 마커 제거
      markers.forEach((marker) => marker.setMap(null));
      const newMarkers = [];

      for (const inspection of inspections) {
        try {
          const position = await getCoordinatesFromAddress(
            inspection.reportInfo.detailAddress
          );

          const marker = new window.naver.maps.Marker({
            position,
            map: map,
            title: inspection.reportInfo.description,
          });

          // 정보창 생성
          const infoWindow = new window.naver.maps.InfoWindow({
            content: `
              <div class="info-window">
                <h3>점검 정보</h3>
                <p><strong>상태:</strong> ${inspection.status}</p>
                <p><strong>유형:</strong> ${inspection.reportInfo.defectType}</p>
                <p><strong>설명:</strong> ${inspection.reportInfo.description}</p>
                <p><strong>주소:</strong> ${inspection.reportInfo.detailAddress}</p>
              </div>
            `,
          });

          // 마커 클릭 이벤트
          window.naver.maps.Event.addListener(marker, "click", () => {
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(map, marker);
            }
          });

          newMarkers.push(marker);
        } catch (error) {
          console.error(
            `주소 변환 실패: ${inspection.reportInfo.detailAddress}`,
            error
          );
        }
      }

      setMarkers(newMarkers);
    } catch (error) {
      console.error("점검 목록 로딩 실패:", error);
      setError("점검 위치를 불러오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        if (!process.env.REACT_APP_NAVER_MAP_CLIENT_ID) {
          throw new Error("Naver Client ID is not defined!");
        }

        // 스크립트 동적 로드
        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}&submodules=geocoder`;
        script.async = true;

        // 스크립트 로드 에러 처리
        script.onerror = () => {
          setError("지도를 불러오는데 실패했습니다.");
          setLoading(false);
        };

        const initNaverMap = () => {
          // mapRef.current가 존재하는지 확인
          if (!mapRef.current) {
            setError("지도를 초기화할 수 없습니다.");
            setLoading(false);
            return;
          }

          // 현재 위치 가져오기
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                const currentLocation = new window.naver.maps.LatLng(
                  latitude,
                  longitude
                );

                // 지도 초기화
                const mapOptions = {
                  center: currentLocation,
                  zoom: 14,
                  mapTypeControl: true,
                  zoomControl: true,
                  zoomControlOptions: {
                    position: window.naver.maps.Position.TOP_RIGHT,
                  },
                };

                const mapInstance = new window.naver.maps.Map(
                  mapRef.current,
                  mapOptions
                );

                // 현재 위치 마커
                new window.naver.maps.Marker({
                  position: currentLocation,
                  map: mapInstance,
                  icon: {
                    content: '<div class="current-location-marker"></div>',
                    anchor: new window.naver.maps.Point(15, 15),
                  },
                });

                setMap(mapInstance);
                setLoading(false);
              },
              (error) => {
                console.error("Geolocation error:", error);
                // 위치 정보를 가져올 수 없는 경우 기본 위치(부산) 사용
                const defaultLocation = new window.naver.maps.LatLng(
                  35.1795543,
                  129.0756416
                );

                const mapOptions = {
                  center: defaultLocation,
                  zoom: 14,
                  mapTypeControl: true,
                  zoomControl: true,
                  zoomControlOptions: {
                    position: window.naver.maps.Position.TOP_RIGHT,
                  },
                };

                const mapInstance = new window.naver.maps.Map(
                  mapRef.current,
                  mapOptions
                );
                setMap(mapInstance);
                setLoading(false);
              }
            );
          } else {
            setError("위치 정보를 사용할 수 없습니다.");
            setLoading(false);
          }
        };

        script.onload = () => {
          // 스크립트 로드 완료 후 window.naver 객체 확인
          if (!window.naver || !window.naver.maps) {
            setError("네이버 지도 API를 초기화하는데 실패했습니다.");
            setLoading(false);
            return;
          }

          // 지도 초기화 함수 호출
          initNaverMap();
        };

        document.head.appendChild(script);
        return () => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        };
      } catch (error) {
        console.error("Map initialization error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    initializeMap();
  }, []);

  // 지도가 초기화되면 마커 생성
  useEffect(() => {
    if (map) {
      createMarkers();
    }
  }, [map]);

  if (loading) return <div className="loading">지도를 불러오는 중...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="map-container">
      <div ref={mapRef} className="naver-map" />
    </div>
  );
};

export default NaverMap;
