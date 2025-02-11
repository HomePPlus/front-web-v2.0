import React from 'react';
const defectTypes = {
  CRACK: {
    label: '균열',
    description: '구조물의 균열로 인한 문제입니다.',
    exampleImage: '../assets/images/model/concrete_crack.jpg', // 실제 이미지 경로로 변경
  },
  PEELING: {
    label: '박리',
    description: '도장이나 마감재, 콘크리트가 벗겨지는 현상입니다.',
    exampleImage: '../assets/images/model/Spalling.jpg', // 실제 이미지 경로로 변경
  },
  LEAK: {
    label: '백태/누수',
    description: '물이나 습기가 새는 현상입니다.',
    exampleImage: '../assets/images/model/efforescence.jpg', // 실제 이미지 경로로 변경
  },
  REBAR_EXPOSURE: {
    label: '철근 노출',
    description: '콘크리트가 벗겨져 철근이 드러나는 현상입니다.',
    exampleImage: '../assets/images/model/exposure.jpg', // 실제 이미지 경로로 변경
  },
  STEEL_DAMAGE: {
    label: '강재 손상',
    description: '강재 구조물의 손상입니다.',
    exampleImage: '../assets/images/model/steeldefect.jpg', // 실제 이미지 경로로 변경
  },
  PAINT_DAMAGE: {
    label: '도장 손상',
    description: '도장이나 페인트가 벗겨지는 현상입니다.',
    exampleImage: '../assets/images/model/paintdamage.jpg', // 실제 이미지 경로로 변경
  },
  UNKNOWN: {
    label: '모름',
    description: '결함 유형을 모르실 경우 선택해주세요.',
  },
  // 추가 결함 유형...
};

export default defectTypes;
