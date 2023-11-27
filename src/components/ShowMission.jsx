import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const MissionContainer = styled.div`
    display: flex;
    flex-direction: column;
    // align-items: center;
    justify-content: center;
    width: 60%;
    margin: 0 auto;
    padding-top:30px;
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

const ShowMission = () => {
    const {state} = useLocation();
    let ACCESS_TOKEN = localStorage.getItem("accessToken");
    const [challenge, setChallenge] = useState([]);
    const [missions, setMissions] = useState([]);

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
        <MissionContainer>
                {missions && missions.map((mission,index) => (
                    <TextWrapper>
                        <Mission>미션 {index+1}. &nbsp;&nbsp; {mission.mission} &nbsp;&nbsp; 날짜: {mission.missionDate}</Mission>
                        <Line/>
                    </TextWrapper>
                ))}
        </MissionContainer>
    );
};

export default ShowMission;