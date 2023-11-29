import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuBox from "../components/MenuBox";
import mymission from "../images/mymission.png";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";

const Wrapper = styled.div``;
const CategoryLine = styled.div`
  display: flex;
  margin: 40px 60px 20px;
`;
const CategoryTxt = styled.div`
  font-family: "Dongle-regular";
  font-size: 2.5rem;
  line-height: 70px;
  margin-right: 20px;
  font-weight: 500;
  white-space: nowrap;
`;
const Line = styled.div`
  background: #000;
  height: 4px;
  border: 0;
  width: 69vw;
  margin-top: 33px;
`;
const MoreBtn = styled.div`
  font-family: "Dongle-regular";
  font-weight: 700;
  cursor: pointer;
  font-size: 2.5rem;
  white-space: nowrap;
  line-height: 70px;
  margin-left: 20px;

`;
const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 280px 280px 280px 280px;
  justify-content: space-between;
  width: 70vw;
  margin-left: 70px;
  margin-bottom: -20px;
`;
const ImgBox = styled.div`
  border: 4px solid #ffe27c;
  border-radius: 30px;
  width: 220px;
  height: 240px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 10px;
`;
const MissionImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const BtnContainer = styled.div`
  position: fixed;
  top: 75%;
  right: -20px;
`;
const Title = styled.div`
  font-family: "Pretendard";
  font-weight: 600;
  font-size: 1.2rem;
  color: black;
  width: fit-content;
  margin-bottom: 5px;
  width: 220px;
  text-align: left;
  word-wrap: break-word;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Date = styled.div`
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 1rem;
    color: #646464;
    margin-top: 0.5rem;
    border-top: 1px solid #ccc;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    width: 225px;
`
const Explain = styled.div`
    width: 225px;
    margin-bottom: 60px;
    border-top: 1px solid #ccc;
    padding-top: 0.5rem;
    font-size: 1rem;   
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2; // 원하는 라인수
    -webkit-box-orient: vertical;
`

const HomePage = () => {
  const navigate = useNavigate();
  const [Imminent, setImminent] = useState([]);
  const [hotList, setHotList] = useState([]);
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const getImminent = () => {
    axios
      .get("http://43.200.19.7:8080/api/v1/main/imminent", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log("imminent", response);
        setImminent(response.data);
      });
  };
  const getHot = () => {
    axios
      .get("http://43.200.19.7:8080/api/v1/main/hot", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log("hot: ", response);
        setHotList(response.data);
      });
  };

  useEffect(() => {
    getImminent();
    getHot();
  }, []);

  const handleImageClick = (e) => {
    console.log(e.target);
    navigate(`/songchallenge/recruitdetail`, { state: {state: e.target.parentElement.id, start: e.target.parentElement.parentElement.children[2].children[1].textContent }});
};

  return (
    <Wrapper>
      <MenuBox />
      <CategoryLine>
        <CategoryTxt>마감 임박 챌린지</CategoryTxt>
        <Line />
        <MoreBtn
          onClick={() => {
            navigate("/imminent");
          }}
        >
          MORE &nbsp;&nbsp;{">"}
        </MoreBtn>
      </CategoryLine>
      <CardContainer>
        {Imminent &&
          Imminent.map((challenge) => (
            <div>
              <ImgBox key={challenge.challenge_id} onClick={handleImageClick} id={challenge.challenge_id}>
                <MissionImg
                  referrerPolicy="no-referrer"
                  src={`http://43.200.19.7:8080/api/v1/picture?pictureName=${challenge.picture}`}
                  onClick={() => {
                    navigate("/home");
                  }}
                />
              </ImgBox>
              <Title>{challenge.challenge_title}</Title>
              <Date><span style={{fontWeight:"500"}}>기간</span>
              <span><span style={{color:"#42AF53"}}>{challenge.startDate.substring(0,4)}.{challenge.startDate.substring(4,6)}.{challenge.startDate.substring(6,8)}</span> ~ {challenge.endDate.substring(0,4)}.{challenge.endDate.substring(4,6)}.{challenge.endDate.substring(6,8)}</span></Date>
              <Explain>{challenge.detail}</Explain>
            </div>
          ))}
      </CardContainer>
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
      <CategoryLine>
        <CategoryTxt>실시간 인기 챌린지</CategoryTxt>
        <Line style={{ width: "70vw" }} />
        <MoreBtn
          onClick={() => {
            navigate("/hot");
          }}
        >
          MORE &nbsp;&nbsp;{">"}
        </MoreBtn>
      </CategoryLine>
      <CardContainer>
        {hotList &&
          hotList.map((challenge) => (
            <div>
              <ImgBox key={challenge.challenge_id} onClick={handleImageClick} id={challenge.challenge_id}>
                <MissionImg
                  referrerPolicy="no-referrer"
                  src={`http://43.200.19.7:8080/api/v1/picture?pictureName=${challenge.picture}`}
                  onClick={() => {
                    navigate("/home");
                  }}
                />
              </ImgBox>
              <Title>{challenge.challenge_title}</Title>
              <Date><span style={{fontWeight:"bold"}}>기간</span>
              <span>{challenge.startDate.substring(0,4)}.{challenge.startDate.substring(4,6)}.{challenge.startDate.substring(6,8)} ~ {challenge.endDate.substring(0,4)}.{challenge.endDate.substring(4,6)}.{challenge.endDate.substring(6,8)}</span></Date>
              <Date><span style={{fontWeight:"bold", marginBottom:"60px"}}>신칭인원</span><span style={{color:"#42AF53"}}>{challenge.participantsNumber} 명</span></Date>
            </div>
          ))}
      </CardContainer>
    </Wrapper>
  );
};

export default HomePage;
