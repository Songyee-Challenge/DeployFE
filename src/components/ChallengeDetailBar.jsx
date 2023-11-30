import React, {useState} from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const ChallengeDetailMenu = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  margin: 3px -40px 30px;
`;

const Menu = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-right: ${props => props.marginR};
  cursor: pointer;
`;

const ChallengeDetailBar = () => {
  const state = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <ChallengeDetailMenu>
        <Menu marginR="25px" onClick={() => {navigate('/challenge/detail');}}>
          🍄 챌린지
        </Menu>
        <Menu marginR="25px" onClick={() => {navigate('/challenge/detail/calendar');}}>
          🍄 챌린지달력
        </Menu>
        <Menu marginR="25px" onClick={() => {navigate('/challenge/detail/mission');}}>
          🍄 미션보기
        </Menu>
        <Menu onClick={() => {navigate('/challenge/detail/guide');}}>
          🍄 챌린지가이드
        </Menu>
      </ChallengeDetailMenu>
    </>
  );
};

export default ChallengeDetailBar;