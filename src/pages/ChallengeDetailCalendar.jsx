import React, { Component, useEffect, useState } from "react";
import styled from 'styled-components';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import koLocale from '@fullcalendar/core/locales/ko'; // 한글 로케일 파일 가져오기
import { useParams } from "react-router-dom";
import axios from 'axios';
import ChallengeDetailBar from '../components/ChallengeDetailBar';

const Wrapper = styled.div`
  white-space: nowrap;
  margin-left: 95px;
  font-family: 'Pretendard';
`;

const BarLine = styled.div`
  border-bottom: 3px solid #000;
  width: 158px;
  margin-left: 102px;
  padding-top: 40px;
  position: fixed;
  z-index: 1;
`;

const ContentWrapper = styled.div`
  margin-right: 210px;
  margin-left: 60px;
  padding-top: 80px;
  width: '80%';
`;

const ChallengeDetailCalendar = () => {
  const params = useParams();
  const challengeId = params.id;
  let ACCESS_TOKEN = localStorage.getItem("accessToken");
  const [challenge, setChallenge] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [eventData, setEventData] = useState([]);
  // console.log("sd",sd);

  const getFormattedDate = (date) => {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6, 8);
    return `${year}-${month}-${day}`;
  }

  const dateClick = (info) => {
    alert(info.dateStr);
  }

  const dayCellContent = (arg) => {
      // 각 날짜 셀의 내용을 설정 (일의 '일' 부분을 제외)
      const dayOfMonth = arg.dayNumberText.replace('일', '');
      return <span>{dayOfMonth}</span>;
  }

  const getChallenge = () => {
    axios.get(`http://43.200.19.7:8080/api/v1/challenge/${challengeId}`,  {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': ` Bearer ${ACCESS_TOKEN}`
      }
    })
    .then((response) => {
      console.log('챌린지 달력: ',response.data);
      setChallenge(response.data);
      setStartDate(response.data.startDate.slice(0, 4)+"-"+response.data.startDate.slice(4, 6)+"-"+response.data.startDate.slice(6, 8));
      console.log(startDate)
      const startEvent = {title: '챌린지 시작', date: response.data.startDate.slice(0, 4)+"-"+response.data.startDate.slice(4, 6)+"-"+response.data.startDate.slice(6, 8)};
      const endEvent = {title: '챌린지 마감', date: response.data.endDate.slice(0, 4)+"-"+response.data.endDate.slice(4, 6)+"-"+response.data.endDate.slice(6, 8)};
      const missionEvenets = response.data.missions.map((mission) => ({
        title: mission.mission,
        date: getFormattedDate(mission.missionDate)
      }));
      const events = [startEvent, endEvent, ...missionEvenets];
      
      setEventData(events);
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  useEffect(() => {
    getChallenge();
  }, [challengeId])
  
  const eventContent = (arg) => {
    const { event } = arg;

    const commonStyle = {
      padding: '4px 8px',
      margin: '-1px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      position: 'relative',
    };

    const startAndEndStyle = {
      color: 'white',
      backgroundColor: '#3273dc',
    };

    const missionStyle = {
      color: 'black',
      backgroundColor: '#FFE27C',
    };

    const style = event.title === '챌린지 시작' || event.title === '챌린지 마감' ? startAndEndStyle : missionStyle;

    return (
      <div style={{...commonStyle, ...style}}>{event.title}</div>
    );
  }
  
  return (
    <Wrapper>
      <ChallengeDetailBar challengeId={challengeId}/>
      <BarLine/>
      <ContentWrapper>
        {startDate ? (
          <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={'dayGridMonth'}
          headerToolbar={
              {
              start: `today`,
              center: 'title',
              end: 'prev,next'
              }
          }
          initialDate={startDate}
          height={"75vh"}
          dateClick={dateClick}
          events={eventData}
          locale={koLocale} // 한글 로케일 설정
          dayCellContent={dayCellContent} // 각 날짜 셀의 내용 커스터마이즈
          eventContent={eventContent}
        />
        ) : (
          <p>Loading...</p>
        )}
      </ContentWrapper>
    </Wrapper>
  );
};

export default ChallengeDetailCalendar;