import React from 'react';
import styled from 'styled-components';

const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  font-family:'Pretendard';
`;

const ProgressBarWrapper = styled.div`
  width: 170px; /* 프로그레스 바의 전체 너비 */
  height: 10px; /* 프로그레스 바의 높이 */
  border-radius: 10px; /* 모서리가 둥근 직사각형 모양 설정 */
  background-color: #ccc; /* 기본 회색 배경색 */
  position: relative;
  margin-right: 10px; /* 오른쪽 여백 */
  margin-left:12px;
`;

const ProgressBarFill = styled.div`
  height: 100%;
  border-radius: 10px;
  background-color: #00A7FF; /* 하늘색으로 채워지는 부분 */
  width: ${({ percentage }) => `${percentage}%`};
  transition: width 0.3s; /* 너비가 변할 때 부드럽게 전환 */
`;

const PercentageNumber = styled.span`
  color: #00A7FF; /* 하늘색으로 퍼센트 숫자의 색상 설정 */
  font-weight: bold;
  margin-left: 3px;
`;

const ProgressBar = ({ percentage = 0 }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarWrapper>
        <ProgressBarFill percentage={percentage} />
      </ProgressBarWrapper>
      <PercentageNumber>{`${percentage}%`}</PercentageNumber>
    </ProgressBarContainer>
  );
};

export default ProgressBar;
