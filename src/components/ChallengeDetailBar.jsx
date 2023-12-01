import React, {useState} from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ChallengeDetailMenu = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  margin: 0 -40px 30px;
  padding-top: 3px;
  background-color: white;
  z-index: 100px;
`;

const Menu = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-right: ${props => props.marginR};
  cursor: pointer;
  background-color: white;
`;

const ChallengeDetailBar = ({ challengeId }) => {
  const navigate = useNavigate();

  return (
    <>
      <ChallengeDetailMenu>
        <Menu marginR="25px" onClick={() => {navigate(`/challenge/detail/${challengeId}`);}}>
          🍄 챌린지
        </Menu>
        <Menu marginR="25px" onClick={() => {navigate(`/challenge/detail/${challengeId}/calendar`);}}>
          🍄 챌린지달력
        </Menu>
        <Menu marginR="25px" onClick={() => {navigate(`/challenge/detail/${challengeId}/mission`);}}>
          🍄 미션보기
        </Menu>
        <Menu onClick={() => {navigate(`/challenge/detail/${challengeId}/guide`);}}>
          🍄 챌린지가이드
        </Menu>
      </ChallengeDetailMenu>
    </>
  );
};

export default ChallengeDetailBar;