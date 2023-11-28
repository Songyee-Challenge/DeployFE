import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import example from "../images/exampleimage.png";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import Button from "./Button";

const OngoingBox = styled.div`
    margin-left:3vw;
    margin-top:2vw;
    font-family:'Pretendard';
    display: flex;
    flex-direction: column;
`;

const ChallengeCount = styled.div`
    margin-left: auto;
    margin-right: 4.4vw;
    margin-bottom: 20px;
`;

const OngoingList = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
`;

const OngoingImageContainer = styled.div`
  border: 2px solid #ffd700;
  border-radius: 30px;
  overflow: hidden;
  width: 253px;
  height: 347px;
  cursor: pointer;
`;

const OngoingImage = styled.img`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  object-fit: cover;
`;

const OngoingInfo = styled.div`
  width: 17rem;
`;

const OngoingTitle = styled.h3`
  font-weight: bold;
  font-size: 1.25rem;
`;

const OngoingDetails = styled.p`
  margin-top: 0.5rem;
  border-top: 1px solid #ccc;
  padding-top: 0.5rem;
  font-size: 1.1rem;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  width: 253px;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;
const BtnContainer = styled.div`
  position: fixed;
  top: 75%;
  right: -20px;
`;

const OngoingChallenge = () => {
  const navigate = useNavigate();
  const [ongoing, setOngoing] = useState([]);
  const [total, setTotal] = useState("0");
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const handleImageClick = (e) => {
    console.log(e.target.id);
    navigate(`/songchallenge/ongoingdetail`, {
      state: {
        state: e.target.id,
        start:
          e.target.parentElement.parentElement.children[1].children[1]
            .children[1].textContent,
      },
    });
  };

  const getOngoing = () => {
    axios
      .get("http://43.200.19.7:8080/api/v1/challenge/inprocess", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setOngoing(response.data);
        setTotal(response.data.length);
      });
  };

  useEffect(() => {
    getOngoing();
  }, []);

    return (
        <OngoingBox>
            <ChallengeCount>총 {total}개의 챌린지</ChallengeCount>
            <OngoingList>
           {ongoing && ongoing.map(challenge => (
            <div>
              <OngoingImageContainer onClick={handleImageClick}>
                <OngoingImage
                  id={challenge.challenge_id}
                  src={`http://43.200.19.7:8080/api/v1/picture?pictureName=${challenge.picture}`}
                />
              </OngoingImageContainer>
              <OngoingInfo>
                <OngoingTitle>{challenge.challenge_title}</OngoingTitle>
                <OngoingDetails>
                  <span style={{fontWeight:'bold'}}>기간</span>
                  <span style={{ fontWeight: "bold" }}>
                    {challenge.startDate.substring(0, 4)}.
                    {challenge.startDate.substring(4, 6)}.
                    {challenge.startDate.substring(6, 8)}
                    &nbsp;~&nbsp;
                    {challenge.endDate.substring(0, 4)}.
                    {challenge.endDate.substring(4, 6)}.
                    {challenge.endDate.substring(6, 8)}
                  </span>
                </OngoingDetails>
                <OngoingDetails>
                  <span>진행</span>
                  <span>
                    <ProgressBar percentage={challenge.progressPercent} />
                  </span>
                </OngoingDetails>
                {/* 진행바 기능 추가해야됨! */}
                <OngoingDetails>{challenge.detail}</OngoingDetails>
              </OngoingInfo>
            </div>
          ))}
      </OngoingList>
      <BtnContainer>
        <Button
          fontSize="2.3rem"
          title={`챌린지 생성\n \u00A0바로가기`}
          marginTop="25px"
          marginLeft="15px"
          onClick={() => {
            navigate("/agree");
          }}
        />
      </BtnContainer>
    </OngoingBox>
  );
};

export default OngoingChallenge;
