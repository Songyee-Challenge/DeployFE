import React, { Component, useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from '@fullcalendar/react';
import koLocale from '@fullcalendar/core/locales/ko'; // 한글 로케일 파일 가져오기
import { useLocation } from "react-router-dom";
import axios from 'axios';

const DashBoard = () => {
    const state = useLocation();
    console.log("state",state.state);
    let ACCESS_TOKEN = localStorage.getItem("accessToken");
    const [challenge, setChallenge] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [length, setLength] = useState("");
    const [missions, setMissions] = useState([]);
    const sd = state.state.start.substring(0, 4)+"-"+state.state.start.substring(5, 7)+"-"+state.state.start.substring(8, 10);
    const [ms, setMs] = useState([]);

    console.log("sd",sd);

    const dateClick = (info) => {
        alert(info.dateStr);
    }

    const dayCellContent = (arg) => {
        // 각 날짜 셀의 내용을 설정 (일의 '일' 부분을 제외)
        const dayOfMonth = arg.dayNumberText.replace('일', '');
        return <span>{dayOfMonth}</span>;
    }

    const getChallenge = () => {
        axios.get(`http://43.200.19.7:8080/api/v1/challenge/${state.state.state}`,  {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': ` Bearer ${ACCESS_TOKEN}`
          }
      })
      .then((response) => {
        console.log('챌린지 달력: ',response.data);
        setChallenge(response.data);
        setLength(response.data.missions.length);
        setStartDate(response.data.startDate.slice(0, 4)+"-"+response.data.startDate.slice(4, 6)+"-"+response.data.startDate.slice(6, 8)+"");
        setEndDate(response.data.endDate.slice(0, 4)+"-"+response.data.endDate.slice(4, 6)+"-"+response.data.endDate.slice(6, 8)+"");
        setMissions(response.data.missions);
        
        for (var i=0; i<response.data.missions.length; i++) {
            sd['title'] = response.data.missions[i].mission;
            sd['date'] = response.data.missions[i].missionDate;
        }
      })
      .catch(error => {
        console.log(error);
      })
      }
    
      useEffect(() => {
        getChallenge();
      }, [])

    
        return (
            <>
                <div style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, width: '80%' }}>
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
                        initialDate={sd}
                        height={"85vh"}
                        dateClick={dateClick}
                        events={[
                            { title: '챌린지 시작', date: `${startDate}` },
                            { title: '챌린지 마감', date: `${endDate}`},
                        ]}
                        locale={koLocale} // 한글 로케일 설정
                        dayCellContent={dayCellContent} // 각 날짜 셀의 내용 커스터마이즈
                        // events 부분에 백에서 받아온 미션을 받아오는 코드로 수정해야 됨
                    />
                </div>
            </>
        );
    };

    export default DashBoard;