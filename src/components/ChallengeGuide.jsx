import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import guide from '../images/guide.png'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const GuideWrapper = styled.div`
    display: flex;
    // align-items: center; /* 세로 중앙 정렬 */
    background-color: #FDF9EA;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 80%;
    margin-top: 30px;
    margin-left: 7%;
    padding: 20px;
    font-family:'Pretendard';
`;

const GuideContent=styled.div`
    // display:flex;
    flex-direction: column;
    margin-left: 20px;
`;

const GuideImg = styled.img`
  width: 68px;
  height: 80px;
  margin-top:20px;
  margin-left:10px;
  margin-right: -10px; /* 이미지와 텍스트 간격을 조절하기 위한 마진 값 */
`;

const Title = styled.p`
    font-family:'Pretendard';
    font-size:48px;   
    margin-left:10px; 
    font-weight: 600;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -30px;
  padding: 10px;
`;

const Point = styled.p`
    font-family:'Pretendard';
    font-size:20px;
    font-weight:600;
    color: #FF6C11;
    margin-bottom:0px;
`;

const ChallengeGuide = () => {
  const {state} = useLocation();
    let ACCESS_TOKEN = localStorage.getItem("accessToken");
    const [challenge, setChallenge] = useState([]);

    const getChallenge = () => {
        axios.get(`http://43.200.19.7:8080/api/v1/challenge/${state.state}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${ACCESS_TOKEN}`
            }
        })
        .then((response) => {
          console.log('챌린지: ',response.data);
          setChallenge(response.data);
        })
        .catch(error => {
          console.log(error);
        })
    };

    useEffect(() => {
        getChallenge();
    }, []);

  return (
    <GuideWrapper>
        <GuideImg src={guide}/>
        <GuideContent>
        <InfoBox>
            <Title>챌린지 가이드</Title>
            <Point>챌린지 개설자</Point>
            <p>송이마을에 살고있는 {challenge.writer} 눈송이입니다</p>
            {/* '송이마을에 살고있는' {입력값} '눈송이입니다. */}
            <Point>챌린지를 시작하며</Point>
            <p>혼자서는 하기 힘들었던 매일의 습관!
            <br/>미션을 통해 매일 즐거움과 짜릿함으로 이겨봅시다~</p>
            <Point>챌린지 진행</Point>
            <p>- 별도의 미션 인증은 없지만 나와의 약속을 성실하게 실천해봅시다. 
            <br/>- 하루의 마무리에 소감을 기록하세요.</p>
        </InfoBox>
      </GuideContent>
    </GuideWrapper>
  );
};

export default ChallengeGuide;
