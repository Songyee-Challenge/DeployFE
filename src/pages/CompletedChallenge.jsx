import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import example from "../images/exampleimage.png";
import ProgressBar from "../components/ProgressBar";
import axios from "axios";
import Button from "../components/Button";
import ChallengeBar from "../components/ChallengeBar.jsx";
import SearchBar from "../components/SearchBar.jsx";

const CompletedBox = styled.div`
  margin-left: 47.5px;
  margin-right: 40px;
  font-family:'Pretendard';
  margin-bottom: 180px;
`;

const TitleBox = styled.div`
  margin-right: 30px;
  margin-left: 10px;
  padding-bottom: 19px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  position: fixed;
`;

const Title = styled.div`
  margin-top: -5px;
  padding-bottom: 17px;
  width: 100%;
  background-color: white;
`;

const Search = styled.div`
  padding-top: 27.5px;
  background-color: white;
  padding-right: 72px;
`;

const Line = styled.div`
  margin-top: 43px;  
  margin-left: 438px;
  width: 160px;
  border-bottom: 4px solid #000;
  position: fixed;
  background-color: white;
`;
const Body = styled.div`
  margin-left: 10px;
  margin-right: 3.3vw; 
  padding-top: 40px;
  overflow-y: auto;
`;
const ChallengeCount = styled.div`
  margin-top: 20px;
  margin-left: 5px;
  margin-right: 3vw;
  margin-bottom: 20px;
  font-size: 1.1rem;
`;
const CompletedList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 60px;
  width: 100%;
`;

const CompletedImageContainer = styled.div`
  border: 2px solid #ffd700;
  border-radius: 30px;
  overflow: hidden;
  width: 253px;
  height: 347px;
  cursor: pointer;
`;

const CompletedImage = styled.img`
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
  object-fit: cover;
`;

const CompletedInfo = styled.div`
`;

const CompletedTitle = styled.h3`
  font-weight: 600;
  font-size: 1.2rem;
  color: black;
  margin-bottom: 5px;
  width: 245px;
  text-align: left;
  word-wrap: break-word;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CompletedDetails = styled.div`
  width: 245px;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 0.5rem;
  border-top: 1px solid #ccc;
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
`;

const CompletedProcess = styled.div`
  margin-top: 0.5rem;
  border-top: 1px solid #ccc;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  width: 253px;
`
const CompletedExplain = styled.div`
  width: 245px;
  border-top: 1px solid #ccc;
  padding-top: 0.5rem;
  font-size: 1rem;   
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

const CompletedChallenge = () => {
  const navigate = useNavigate();
  const [complete, setComplete] = useState([]);
  const [total, setTotal] = useState("0");
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const handleImageClick = (e) => {
    //console.log(e.target.id);
    navigate(`/challenge/detail`, {
      state: {
        state: e.target.id,
        start:
          e.target.parentElement.parentElement.children[1].children[1]
            .children[1].textContent,
      },
    });
  };

  const getCompleted = () => {
    axios
      .get("http://43.200.19.7:8080/api/v1/challenge/finished", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setComplete(response.data);
        setTotal(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getCompleted();
  }, []);

  return (
    <CompletedBox>
      <TitleBox>
        <Title><ChallengeBar/></Title>
        <Search><SearchBar/></Search>
      </TitleBox>
      <Line/>
      <Body>
        <ChallengeCount>총 {total}개의 챌린지</ChallengeCount>
        <CompletedList>
          {complete && complete.map(challenge=>( 
            <div>
              <CompletedImageContainer onClick={handleImageClick}>
                <CompletedImage id={challenge.challenge_id} src={`http://43.200.19.7:8080/api/v1/picture?pictureName=${challenge.picture}`}/>
              </CompletedImageContainer>
              <CompletedInfo>
                <CompletedTitle>{challenge.challenge_title}</CompletedTitle>
                <CompletedDetails>
                  <span>기간</span>
                  <span>{challenge.startDate.substring(0, 4)}.{challenge.startDate.substring(4, 6)}.{challenge.startDate.substring(6, 8)}
                  &nbsp;~&nbsp;
                  {challenge.endDate.substring(0, 4)}.{challenge.endDate.substring(4, 6)}.{challenge.endDate.substring(6, 8)}</span>
                </CompletedDetails>
                <CompletedProcess>
                  <span>진행</span>
                  <span><ProgressBar percentage={challenge.progressPercent}/></span>
                </CompletedProcess>
                <CompletedExplain>{challenge.detail}</CompletedExplain>
              </CompletedInfo>
            </div>
          ))}
        </CompletedList>   
      </Body>
    </CompletedBox>
  );
};

export default CompletedChallenge;
