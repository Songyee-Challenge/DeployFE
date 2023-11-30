import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import example from '../images/exampleimage.png';
import ProgressBar from '../components/ProgressBar';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ChallengeDetailBar from '../components/ChallengeDetailBar';

const Wrapper = styled.div`
  white-space: nowrap;
  margin-left: 95px;
  font-family: 'Pretendard';
`;

const BarLine = styled.div`
  border-bottom: 3px solid #000;
  width: 108px;
  margin-left: -35px;
  padding-top: 50px;
  position: fixed;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const ChDiv = styled.div`
  object-fit: cover;
  border: 2px solid #ffd700;
  border-radius: 30px;
  overflow: hidden;
  width: 475px;
  min-width: 475px;
  height: 563px;
  margin-left: -39px;
  margin-right: 100px;
  margin-top: 90px;
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
  margin-top: 90px;
`;

const InfoHead = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
`

const ChallengeTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-top: 20px;
`;

const ChallengeInfo = styled.div`
  font-size: 20px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const InfoItem = styled.div`
  display: flex;
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
  margin-top: 3px;
  margin-left: auto;
  margin-right: 4vw;
  font-weight: bold;
  width: 160px;
  height: 60px;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #367542;
  }
`;

const Line = styled.hr`
  width: 920px;
  margin-left: -10px;
  margin-right: 3vw;
`;

const Explain = styled.p`
  font-size: 18px;
  width: 700px;
  height: 130px;
  word-break:break-all;
  white-space: pre-line;
  margin-top: 5px;
  margin-bottom: 30px;
`

const Sort = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: -20px;
`;

const ChallengeDetail = () => {
  const {state} = useLocation();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [challenge, setChallenge] = useState([]);
  const [length, setLength] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [challengeStatus, setChallengeStatus] = useState("");
  let today = new Date();

  const leadingZeros = (n, digits) => {
    var zero = '';
    n = n.toString();

    if (n.length < digits) {
        for (const i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
  }

  today = leadingZeros(today.getFullYear(), 4) +
            leadingZeros(today.getMonth() + 1, 2) +
            leadingZeros(today.getDate(), 2);

  const getChallengeStatus = (challengeStart, challengeEnd) => {
    if (challengeStart > today) {
        setChallengeStatus("모집 중인 챌린지");
    } else if (today >= challengeStart && today <= challengeEnd) {
        setChallengeStatus("진행 중인 챌린지");
    } else {
        setChallengeStatus("종료된 챌린지");
    }
    };

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

        setShowSubmitButton(response.data.startDate > today);
        getChallengeStatus(response.data.startDate, response.data.endDate);
        console.log(today);
        console.log(response.data.startDate);
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
      <ChallengeDetailBar/>
      <BarLine/>
      <ContentWrapper>
        <ChDiv><ChallengeImg src={`http://43.200.19.7:8080/api/v1/picture?pictureName=${challenge.picture}`} /></ChDiv>
        <TextWrapper>
          <Sort>{challengeStatus}</Sort>
          <InfoHead>
            <ChallengeTitle>{challenge.challenge_title}</ChallengeTitle>
            {showSubmitButton && <ChallengeBtn onClick={handleSubmit}>도전하기</ChallengeBtn>}
          </InfoHead>
          <Explain>{challenge.detail}</Explain>
          <ChallengeInfo>
            <Line />
            <InfoItem>
              <InfoLabel>개설자&nbsp;&nbsp;&nbsp;&nbsp;</InfoLabel>
              <div>{challenge.writer}</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>기간&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InfoLabel>
              <span style={{fontWeight:'bold'}}>{state.start}</span>
            </InfoItem>
            <InfoItem>
              <InfoLabel>미션 개수</InfoLabel>
              <div>{length} 개</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>신청 인원</InfoLabel>
              <div>{challenge.participantsNumber} 명</div>
            </InfoItem>
            <InfoItem>
              <InfoLabel>진행률&nbsp;&nbsp;&nbsp;&nbsp;</InfoLabel>
              <div style={{marginLeft:'-10px', width: '100%'}}><ProgressBar percentage={challenge.progressPercent}/></div>
            </InfoItem>
            <Line/>
          </ChallengeInfo>
        
      </TextWrapper>
    </ContentWrapper>            
    </Wrapper>
  );
};

export default ChallengeDetail;
