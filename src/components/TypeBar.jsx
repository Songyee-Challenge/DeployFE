import React, { useState } from 'react';
import styled from 'styled-components';
import RecruitingChallenge from './RecruitingChallenge';
import OngoingChallenge from './OngoingChallenge';
import CompletedChallenge from './CompletedChallenge';
import searchicon from '../images/search.png';
import filter from '../images/filter.png';
import axios from 'axios';
 
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 2vw;
  white-space: nowrap;
  align-items: center;
`;

const CustomButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  padding: 0;
  font-family:'Pretendard';
  font-size: 25px;
  font-weight: bold;
  color: #000;
  margin-right: 2vw;
  margin-top: 15px;
  flex: 0 0 auto;
  

  &.active {
    &:after {
      content: '';
      display: block;
      position: absolute;
      bottom: -15px;
      left: 0;
      width: 100%;
      height: 4px;
      border-radius: 50px;
      background-color: #000;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center; 
  margin-left: auto; /* 이 부분 추가 - 왼쪽 여백을 auto로 설정하여 오른쪽 정렬 */
`;

const SearchInput = styled.input`
  border: 1px solid #ccc;
  width: 20vw;
  height: 25px;
  padding: 5px;
  margin-top: 18px;
`;

const SearchIcon = styled.img`
  width: 25px;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 18px;
  margin-right: 30px;
`;

const FilterIcon = styled.img`
    width: 25px;
    cursor: pointer;
    margin-left: 10px;
    margin-top: 18px;
    margin-right:5vw;
`;

const TypeBar = ({ onSelectType }) => {
  const [activeComponent, setActiveComponent] = useState('A');
  const [searchTerm, setSearchTerm] = useState('');
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const handleComponentClick = (componentName) => {
    setActiveComponent(componentName);
    onSelectType && onSelectType(componentName);
  };

  const handleSearch = () => {
    axios.get(`/api/v1/challenge/search`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${ACCESS_TOKEN}`
        },
        params: {
          searchWord: searchTerm
        }
      })
      .then((response) => {
        console.log('검색 결과:', response.data);
      })
      .catch((error) => {
        console.error('검색 실패:', error);
      });
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'A':
        return <RecruitingChallenge />;
      case 'B':
        return <OngoingChallenge />;
      case 'C':
        return <CompletedChallenge />;
      default:
        return null;
    }
  };

  return (
    <>
      <ButtonContainer>
        <div>
          <CustomButton
            className={`type_button ${activeComponent === 'A' ? 'active' : ''}`}
            onClick={() => handleComponentClick('A')}
            disabled={activeComponent === 'A'}
          >
            모집 중인 챌린지
          </CustomButton>
          <CustomButton
            className={`type_button ${activeComponent === 'B' ? 'active' : ''}`}
            onClick={() => handleComponentClick('B')}
            disabled={activeComponent === 'B'}
          >
            진행 중인 챌린지
          </CustomButton>
          <CustomButton
            className={`type_button ${activeComponent === 'C' ? 'active' : ''}`}
            onClick={() => handleComponentClick('C')}
            disabled={activeComponent === 'C'}
          >
            종료된 챌린지
          </CustomButton>
        </div>
        <SearchContainer>
            <SearchInput 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchIcon src={searchicon} onClick={handleSearch} />
            <FilterIcon src={filter}/>
        </SearchContainer>
      </ButtonContainer>
      {renderComponent()}
    </>
  );
};

export default TypeBar;
