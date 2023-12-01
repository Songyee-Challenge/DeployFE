import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ChallengeMenu = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  background-color: white;
`;

const Menu = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-right: ${props => props.marginR};
  cursor: pointer;
  background-color: white;
`;

const ChallengeBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <ChallengeMenu>
        <Menu marginR="2vw" onClick={() => {navigate('/challenge/recruiting');}}>
            모집 중인 챌린지
        </Menu>
        <Menu marginR="2vw" onClick={() => {navigate('/challenge/ongoing');}}>
            진행 중인 챌린지
        </Menu>
        <Menu onClick={() => {navigate('/challenge/finished');}}>
            종료된 챌린지
        </Menu>
      </ChallengeMenu>
    </>
  );
};

export default ChallengeBar;