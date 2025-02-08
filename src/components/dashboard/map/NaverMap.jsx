// NaverMap.jsx
import React, { useEffect, useRef, useState } from 'react';
import { getInspectionReports } from '../../../api/apiClient';
import '../dashboardCommon.css';
import './NaverMap.css';

const NaverMap = () => {
  // 상태 관리
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 주소를 좌표로 변환하는 함수
  const getCoordinatesFromAddress = async (address) => {
    return new Promise((resolve, reject) => {
      if (!window.naver || !window.naver.maps || !window.naver.maps.Service) {
        reject(new Error('Naver Maps Service is not loaded'));
        return;
      }

      window.naver.maps.Service.geocode(
        {
          query: address,
        },
        function (status, response) {
          if (status === window.naver.maps.Service.Status.ERROR) {
            reject(new Error('Geocoding failed'));
            return;
          }
          if (response.v2.meta.totalCount === 0) {
            reject(new Error('No results found'));
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

      markers.forEach((marker) => marker.setMap(null));
      const newMarkers = [];

      for (const inspection of inspections) {
        try {
          const reportInfo = inspection.report_info || {}; // report_info가 없을 경우 빈 객체로 초기화
          const address = reportInfo.detail_address; // detail_address를 안전하게 가져옴

          if (address) { // address가 존재할 경우에만 마커 생성
            const position = await getCoordinatesFromAddress(address);
            const marker = new window.naver.maps.Marker({
              position,
              map: map,
              title: reportInfo.description,
            });

            // 정보창 생성
            const infoWindow = new window.naver.maps.InfoWindow({
              content: `
                <div class="info-window">
                  <h3>점검 정보</h3>
                  <p><strong>상태:</strong> ${inspection.status}</p>
                  <p><strong>유형:</strong> ${reportInfo.defect_type}</p>
                  <p><strong>설명:</strong> ${reportInfo.description}</p>
                  <p><strong>주소:</strong> ${address}</p>
                </div>
              `,
            });

            // 마커 클릭 이벤트
            window.naver.maps.Event.addListener(marker, 'click', () => {
              if (infoWindow.getMap()) {
                infoWindow.close();
              } else {
                infoWindow.open(map, marker);
              }
            });

            newMarkers.push(marker);
          } else {
            console.warn(`Inspection ${inspection.inspection_id} does not have a valid detail_address.`);
          }
        } catch (error) {
          console.error(`주소 변환 실패: ${inspection.report_info?.detail_address}`, error);
        }
      }

      setMarkers(newMarkers);
    } catch (error) {
      console.error('점검 목록 로딩 실패:', error);
      setError('점검 위치를 불러오는데 실패했습니다.');
    }
  };

  // 네이버 지도 초기화
  useEffect(() => {
    const loadNaverMap = () => {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}&submodules=geocoder`;
      script.async = true;

      script.onerror = () => {
        setError('지도를 불러오는데 실패했습니다.');
        setLoading(false);
      };

      script.onload = () => {
        if (!window.naver || !window.naver.maps) {
          setError('네이버 지도 API를 초기화하는데 실패했습니다.');
          setLoading(false);
          return;
        }

        try {
          const busanCityHall = new window.naver.maps.LatLng(35.1798159, 129.0750222);
          const mapInstance = new window.naver.maps.Map(mapRef.current, {
            center: busanCityHall,
            zoom: 14,
            mapTypeControl: true,
            zoomControl: true,
            zoomControlOptions: {
              position: window.naver.maps.Position.TOP_RIGHT,
            },
          });

          new window.naver.maps.Marker({
            position: busanCityHall,
            map: mapInstance,
            title: '부산광역시청',
          });

          setMap(mapInstance);
          setLoading(false);
        } catch (error) {
          setError('지도를 초기화하는데 실패했습니다.');
          setLoading(false);
        }
      };

      document.head.appendChild(script);
      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    };

    loadNaverMap();
  }, []);

  // 마커 생성 effect
  useEffect(() => {
    if (map) {
      createMarkers();
    }
  }, [map]);

  return (
    <div className="dashboard-section">
      <div className="content-section">
        <div className="header-section map-title">
          <h2 className="section-title eMedium map-title">부산시 신고 위치</h2>
        </div>
        <div className="content-wrapper">
          {loading && <div className="loading">지도를 불러오는 중...</div>}
          {error && <div className="error">{error}</div>}
          <div ref={mapRef} className="naver-map" />
        </div>
      </div>
    </div>
  );
};

export default NaverMap;
