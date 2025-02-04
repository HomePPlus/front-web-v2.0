import React, { useEffect, useRef, useState } from 'react';
import { getInspectionReports } from '../../api/apiClient';
import './NaverMap.css';

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

      // 기존 마커 제거
      markers.forEach((marker) => marker.setMap(null));
      const newMarkers = [];

      for (const inspection of inspections) {
        try {
          const position = await getCoordinatesFromAddress(inspection.reportInfo.detailAddress);

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
          window.naver.maps.Event.addListener(marker, 'click', () => {
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              infoWindow.open(map, marker);
            }
          });

          newMarkers.push(marker);
        } catch (error) {
          console.error(`주소 변환 실패: ${inspection.reportInfo.detailAddress}`, error);
        }
      }

      setMarkers(newMarkers);
    } catch (error) {
      console.error('점검 목록 로딩 실패:', error);
      setError('점검 위치를 불러오는데 실패했습니다.');
    }
  };

  useEffect(() => {
    const loadNaverMap = () => {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}&submodules=geocoder`;
      script.async = true;

      script.onerror = () => {
        console.error('Failed to load Naver Maps script');
        setError('지도를 불러오는데 실패했습니다.');
        setLoading(false);
      };

      script.onload = () => {
        console.log('Naver Maps script loaded');
        if (!window.naver || !window.naver.maps) {
          console.error('Naver Maps not available');
          setError('네이버 지도 API를 초기화하는데 실패했습니다.');
          setLoading(false);
          return;
        }

        if (!mapRef.current) {
          console.error('Map container not found');
          setError('지도 컨테이너를 찾을 수 없습니다.');
          setLoading(false);
          return;
        }

        try {
          // 부산시청 좌표
          const busanCityHall = new window.naver.maps.LatLng(35.1798159, 129.0750222);

          const mapOptions = {
            center: busanCityHall,
            zoom: 14,
            mapTypeControl: true,
            zoomControl: true,
            zoomControlOptions: {
              position: window.naver.maps.Position.TOP_RIGHT,
            },
          };

          const mapInstance = new window.naver.maps.Map(mapRef.current, mapOptions);
          console.log('Map instance created');

          // 부산시청 마커
          new window.naver.maps.Marker({
            position: busanCityHall,
            map: mapInstance,
            title: '부산광역시청',
          });

          setMap(mapInstance);
          setLoading(false);
        } catch (error) {
          console.error('Error initializing map:', error);
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

  useEffect(() => {
    if (map) {
      createMarkers();
    }
  }, [map]);

  return (
    <div className="map-wrapper">
      {loading && <div className="loading">지도를 불러오는 중...</div>}
      {error && <div className="error">{error}</div>}
      <div ref={mapRef} style={{ width: '100%', height: '600px' }} />
    </div>
  );
};

export default NaverMap;
