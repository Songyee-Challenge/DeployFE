import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import example from '../images/exampleimage.png';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  margin-top: 20px;
  margin-left: 50px;
  font-family: 'Pretendard';
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const ChDiv = styled.div`
  border: 2px solid #ffd700;
  border-radius: 30px;
  overflow: hidden;
  width: 382px;
  height: 466px;
  margin-left: -100px;
  margin-right: 80px;
  margin-top:35px;
`

const ChallengeImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
  margin-left:50px;
`;

const ChallengeInfo = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
`;

const InfoItem = styled.div`
  display: flex;
//   justify-content: flex-start;
  margin-bottom: 20px; /* 간격 조절 */
  margin-top:10px;
`;

const InfoLabel = styled.div`
  margin-right: 30%;
//   margin-right: auto; /* 라벨과 값 간 간격 조절 */
`;

const ChallengeBtn = styled.button`
  font-family: 'Pretendard';
  border: 2px solid #42af53;
  border-radius: 10px;
  background-color: #42af53;
  color: white;
  margin-top: 25px;
  margin-left: 23%;
  font-weight: bold;
  width: 300px;
  height: 80px;
  font-size: 28px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #367542;
  }
`;

const Line = styled.hr`
  width: 100%;
  margin-left: -10px;
  margin-right: 60px;
`;
const Explain = styled.p`
  font-size: 24px;
  width: 700px;
  word-break:break-all;
  white-space: pre-line;
`

const Challenge = () => {
  const {state} = useLocation();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [challenge, setChallenge] = useState([]);
  const [length, setLength] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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
    setLength(response.data.missions.length);
    setStartDate(response.data.startDate.substring(0, 4)+"."+response.data.startDate.substring(4, 6)+"."+response.data.startDate.substring(6, 8));
    setEndDate(response.data.endDate.substring(0, 4)+"."+response.data.endDate.substring(4, 6)+"."+response.data.endDate.substring(6, 8));
  })
  .catch(error => {
    console.log(error);
  })
  }

  useEffect(() => {
    getChallenge();
  }, [])

  const handleSubmit = () => {
    axios.post(`http://43.200.19.7:8080/api/v1/challenge/register/${state.state}`,{}, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${ACCESS_TOKEN}`
      } 
    })
    .then (response => {
      console.log(response);
      alert('챌린지 신청 완료');
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <ChDiv><ChallengeImg src={`http://43.200.19.7:8080/api/v1/picture?pictureName=${challenge.picture}`} /></ChDiv>
        <TextWrapper>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold' }}>{challenge.challenge_title}</h2>
          <Explain>
            {challenge.explain}
          </Explain>
          <Line />
          <ChallengeInfo>
            <InfoItem>
              <InfoLabel>개설자&nbsp;&nbsp;&nbsp;&nbsp;</InfoLabel>
              <div>{challenge.writer}</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>기간&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InfoLabel>
              <div>{startDate} ~ {endDate}</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>미션 개수</InfoLabel>
              <div>{length} 개</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>신청 인원</InfoLabel>
              <div>{challenge.participantsNumber} 명</div>
            </InfoItem>
          </ChallengeInfo>
          <Line />
          <ChallengeBtn onClick={handleSubmit}>챌린지 도전하기</ChallengeBtn>
        </TextWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Challenge;
