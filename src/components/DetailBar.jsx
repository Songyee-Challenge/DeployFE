import React, {useState} from 'react';
import styled from 'styled-components';
import RecruitDetail from './RecruitDetail';
import OngoingDetail from './OngoingDetail';
import CompletedDetail from './CompletedDetail';
import ChallengeGuide from './ChallengeGuide';
import FullCalendar from './FullCalendar';
import ShowMission from './ShowMission';
import { useLocation } from 'react-router-dom';

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
  font-size: 1.7rem;
  font-weight: bold;
  color: #000;
  margin-right: 2vw;
  margin-top:10px;
  margin-bottom: 20px;
  flex: 0 0 auto;

  &.active {
    &:after {
      content: '';
      display: block;
      position: absolute;
      bottom: -20px;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: #000;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const LineWrapper = styled.div`
  width:95%;
`;

const SeparateLine = styled.hr`
    border: none;
    border-top: solid 1px #B3B3B3;
    margin-left:0px;
    margin-top:0px;
`;

const DetailBar = ({context}) => {
    const [activeComponent, setActiveComponent] = useState('A');
    const state = useLocation();
    console.log("bar",state);

    const handleComponentClick = (componentName) => {
        setActiveComponent(componentName);
    };

    const renderComponent = () => {
        switch (activeComponent) {
          case 'A':
            if (context === 'recruiting') {
              return <RecruitDetail value={state.state} start={state.start}/>;
            } else if (context === 'ongoing') {
              // 'ongoing' 컨텍스트에 대한 다른 컴포넌트 렌더링
              return <OngoingDetail />;
            } else if (context === 'completed') {
              // 'completed' 컨텍스트에 대한 다른 컴포넌트 렌더링
              return <CompletedDetail />;
            }
            break;
          case 'B':
            return <FullCalendar />;
          case 'C':
            return <ShowMission />;
          case 'D':
            return <ChallengeGuide/>;
          default:
            return null;
        }
      };

    return (
        <>
            <ButtonContainer>
                <div>
                <CustomButton
                className={`detail_type_button ${activeComponent === 'A' ? 'active' : ''}`}
                onClick={() => handleComponentClick('A')}
                disabled={activeComponent === 'A'}
            >
                🍄챌린지
            </CustomButton>
            <CustomButton
                className={`detail_type_button ${activeComponent === 'B' ? 'active' : ''}`}
                onClick={() => handleComponentClick('B')}
                disabled={activeComponent === 'B'}
            >
                🍄챌린지달력
            </CustomButton>
            <CustomButton
                className={`detail_type_button ${activeComponent === 'C' ? 'active' : ''}`}
                onClick={() => handleComponentClick('C')}
                disabled={activeComponent === 'C'}
            >
                🍄미션보기
            </CustomButton>
            <CustomButton
                className={`detail_type_button ${activeComponent === 'D' ? 'active' : ''}`}
                onClick={() => handleComponentClick('D')}
                disabled={activeComponent === 'D'}
            >
                🍄챌린지가이드
            </CustomButton>
            </div>
            </ButtonContainer>
            <LineWrapper>
                <SeparateLine/>
            </LineWrapper>
        {renderComponent()}
      </>
    );
};

export default DetailBar;