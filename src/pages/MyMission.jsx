import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mymission from "../images/mymission.png";
import checked from "../images/checked.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.div`
  padding-top: 11px;
  font-family: "Pretendard";
`;

const Mission = styled.div`
  font-size: 1.4rem;
  border-bottom: 6px solid black;
  font-weight: bolder;
  height: 45px;
  width: 160px;
`;

const Box = styled.div`
  border-top: 1px solid black;
  width: 75vw;
`;

const MissionBox = styled.div`
  width: 72vw;
  display: flex;
  padding: 50px 30px;
  border-bottom: 1px solid grey;
`;

const ImgBox = styled.div`
  border: 4px solid #ffe27c;
  border-radius: 30px;
  width: 180px;
  height: 240px;
  overflow: hidden;
  cursor: pointer;
  min-width: 180px;
`;

const MissionImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-top: 0px;
`;

const ContentBox = styled.div`
  margin-left: 100px;
`;

const HeadDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
`;

const TitleBox = styled.div`
  cursor: pointer;
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  margin-right: 6vw;
`;

const Sub = styled.p`
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: -20px;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 900;
`;

const MissionNum = styled.p`
  font-size: 1.2rem;
  font-weight: 900;
  margin-right: 5vw;
`;

const Num = styled.span`
  padding-left: 20px;
  padding-right: 5px;
  font-size: 1.8rem;
  font-family: "Abril+Fatface";
  width: 10px;
  text-align: center;
`

const Btn = styled.button`
  width: 180px;
  height: 40px;
  background-color: white;
  font-size: 18px;
  font-weight: 900;
  border: 2px solid black;
  margin-top: 0px;
  cursor: pointer;
  white-space: nowrap;
`;

const CheckDiv = styled.div`
  display: flex;
  font-size: 1.1rem;
  margin-bottom: -30px;

  ${({ completed }) => completed && `
  color: #C1C1C1;
  text-decoration: line-through;
  `}
`;

const CheckBox = styled.input`
  margin-top: 20px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  &:checked {
    border-color: transparent;
    background-image: url(${checked});
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;

const Date = styled.p`
  white-space: nowrap;
  margin-top: 11px;
  font-size: 1rem;
  font-weight: 600;
  display: inline-block;
  width: 100px;

  ${({ completed }) => completed && `
    color: #C1C1C1;
    text-decoration: line-through;
  `}
`;

const Label = styled.label`
  margin-left: 10px;
  margin-top: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const MyMission = () => {
  const navigate = useNavigate();
  const [missionList, setMissionList] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [isChecked, setIsChecked] = useState({});
  const [checkedMissions, setCheckedMissions] = useState([]);
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const getMission = () => {
    axios
      .get("http://43.200.19.7:8080/api/v1/mypage/mission", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log(response);
        const updatedMissionList = response.data.map((missionList) => ({
          ...missionList,
          missions: missionList.missions.map((mission, missionIndex) => ({
            ...mission,
          })),
        }));

        const updatedIsChecked = {};
        updatedMissionList.forEach((missionList) => {
          missionList.missions.forEach((mission) => {
            updatedIsChecked[
              `${missionList.challenge_id}-${mission.mission_id}`
            ] = mission.completed;
          });
        });
        setIsChecked(updatedIsChecked);

        setMissionList(updatedMissionList);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const postCheck = (challengeId, missionId) => {
    axios
      .post(
        `http://43.200.19.7:8080/api/v1/mypage/mission/${missionId}/${challengeId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(missionId);
        console.log(challengeId);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error post checkbox data", error);
      });
  };

  useEffect(() => {
    const storedIsChecked = JSON.parse(localStorage.getItem("isChecked"));
    if (storedIsChecked) {
      setIsChecked(storedIsChecked);
    }
    getMission();
  }, []);

  const handleImageClick = (e) => {
    navigate(`/songchallenge/completeddetail`, {
      state: {
        state: e.target.id,
        start:
          e.target.parentElement.parentElement.children[1].children[1]
            .children[1].textContent,
      },
    });
  };

  const handleClickBtn = (e) => {
    console.log(
      e.target.parentElement.children[0].children[0].textContent.substring(4)
    );
    navigate(`/songchallenge/ongoingdetail`, {
      state: {
        state: e.target.id,
        start:
          e.target.parentElement.children[0].children[0].textContent.substring(
            4
          ),
      },
    });
  };

  return (
    <Wrapper>
      <Mission>
        <p>참여한 미션</p>
      </Mission>
      <Box>
        {missionList.map((missionList) => (
          <MissionBox key={missionList.challenge_id}>
            <ImgBox onClick={handleImageClick}>
              <MissionImg
                src={`http://43.200.19.7:8080/api/v1/picture?pictureName=${missionList.picture}`}
              ></MissionImg>
            </ImgBox>
            <ContentBox>
              <HeadDiv>
                <TitleBox
                  onClick={handleClickBtn} id={missionList.challenge_id}>
                  <Sub>{missionList.startDate} ~ {missionList.endDate}</Sub>
                  <Title>{missionList.challenge_title}</Title>
                </TitleBox>
                <MissionNum>
                    내가 성공한 미션
                    <Num>
                      {missionList.completedCount}
                      /{missionList.missionCount}
                    </Num>
                    개
                </MissionNum>
                <Btn onClick={handleClickBtn} id={missionList.challenge_id}>
                  참여한 챌린지 바로가기
                </Btn>
              </HeadDiv>
              {missionList.missions.map((mission) => (
                <CheckDiv key={mission.mission_id} completed={mission.complete}>
                  <CheckBox
                    type="checkbox"
                    id={`mycheck-${mission.mission_id}`}
                    checked={mission.complete}
                    onClick={() =>
                      postCheck(missionList.challenge_id, mission.mission_id)
                    }
                  />
                  <Date>
                    {" "}
                    <Date completed={mission.complete}>
                      {mission.missionDate.substring(0, 4)}.
                      {mission.missionDate.substring(4, 6)}.
                      {mission.missionDate.substring(6, 8)}
                    </Date>
                  </Date>
                  <Label htmlFor={`mycheck-${mission.mission_id}`}>
                    {" "}
                    {mission.mission}
                  </Label>
                </CheckDiv>
              ))}
            </ContentBox>
          </MissionBox>
        ))}
      </Box>
    </Wrapper>
  );
};

export default MyMission;
