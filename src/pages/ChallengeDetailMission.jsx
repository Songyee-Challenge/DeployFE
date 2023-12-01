import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ChallengeDetailBar from '../components/ChallengeDetailBar';

const Wrapper = styled.div`
  white-space: nowrap;
  margin-left: 95px;
  font-family: 'Pretendard';
`;

const BarLine = styled.div`
  border-bottom: 3px solid #000;
  width: 135px;
  margin-left: 287px;
  padding-top: 40px;
  position: fixed;
  z-index: 1;
`;

const MissionContainer = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;
    width: 60%;
    margin: 0 auto;
    padding-top:80px;
`;

const TextWrapper = styled.div`
    padding:10px;
    display: flex;
    flex-direction: column;
`;

const Mission = styled.p`
    font-family: 'Pretendard';
    font-size:1.1rem;
`;

const Line = styled.hr`
    border: none;
    border-top: 1px solid #000;
    width: 100%;
    margin: 10px 0;
`;

const ChallengeDetailMission = () => {
    const params = useParams();
    const challengeId = params.id;
    let ACCESS_TOKEN = localStorage.getItem("accessToken");
    const [challenge, setChallenge] = useState([]);
    const [missions, setMissions] = useState([]);

    const getChallenge = () => {
        axios.get(`http://43.200.19.7:8080/api/v1/challenge/${challengeId}`,  {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ` Bearer ${ACCESS_TOKEN}`
            }
        })
        .then((response) => {
          console.log('챌린지: ',response.data);
          setChallenge(response.data);
          setMissions(response.data.missions);
          console.log(missions);
        })
        .catch(error => {
          console.log(error);
        })
    };

    useEffect(() => {
        getChallenge();
    }, []);

    return (
        <Wrapper>
            <ChallengeDetailBar challengeId={challengeId}/>
            <BarLine/>
            <MissionContainer>
                {missions && missions.map((mission,index) => (
                    <TextWrapper>
                        <Mission>미션 {index+1}. &nbsp;&nbsp;&nbsp; [{mission.missionDate.substring(0,4)}.{mission.missionDate.substring(4,6)}.{mission.missionDate.substring(6,8)}] &nbsp;&nbsp; {mission.mission} &nbsp;&nbsp; </Mission>
                        <Line/>
                    </TextWrapper>
                ))}
            </MissionContainer>
        </Wrapper>
    );
};

export default ChallengeDetailMission;