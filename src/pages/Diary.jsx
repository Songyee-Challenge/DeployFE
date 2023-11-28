import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import profile from "../images/profile.png";
import like_off from "../images/like_off.png";
import like_on from "../images/like_on.png";
import axios from "axios";
import DiaryLike from "../components/DiaryLike";

const Wrapper = styled.div`
  padding-top: 30px;
  margin: 0 auto;
  width: 92vw;
  font-family: "Pretendard";
  padding-bottom: 30px;
`;

const Relay = styled.div`
  display: flex;
  height: 70px;
  margin-top: -40px;
  margin-bottom: 30px;
  border-bottom: 3px solid black;
`;
 
const RelayTxt = styled.p`
  font-size: 1.6rem;
  font-weight: bolder;
`;

const Btn = styled.button`
  color: white;
  background-color: black;
  width: 80px;
  height: 40px;
  white-space: nowrap;
  font-size: 1rem;
  margin: auto 0px 10px auto;
  cursor: pointer;
  font-weight: bolder;
`;

const Moment = styled.p`
  font-size: 1.3rem;
  font-weight: bolder;
`;

const Sub = styled.p`
  font-size: 1.1rem;
  margin-top: -10px;
  margin-bottom: 40px;
`;

const DiaryBox = styled.div`
  width: 100%;
  border-radius: 10px;
  height: 250px;
  background-color: #f2f2f2;
  margin-bottom: 40px;
  margin-top: 20px;
`;

const FlexBox = styled.div`
  display: flex;
  background-color: white;
  border: 1px solid #dddddd;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 7px 10px;
`;

const ImgContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
  border: 0.01cm solid grey;
  margin: 5px 0px 0px 20px;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Div = styled.div`
  height: 60px;
  margin: 0px 15px;
`;

const Name = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bolder;
`;
const LikeBtn = styled.div``;
const LikeImg = styled.img`
  width: 34px;
  height: 32px;
  margin-top: 15px;
  cursor: pointer;
`;
const Date = styled.p`
  margin-top: -10px;
  color: grey;
  font-size: 14px;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bolder;
  margin-top: 5px;
`;

const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: bolder;
  margin-top: -15px;
`;

const LikeDiv = styled.div`
  display: flex;
  margin: auto 15px 0px auto;
  gap: 15px;
`;

const Count = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #646464;
  margin-top: 17px;
`;

const Contents = styled.p`
  padding: 20px 30px;
  font-size: 1.2rem;
`;

const Diary = () => {
  const navigate = useNavigate();
  //const [isLiked, setisLiked] = useState(false);
  const [relayList, setRelayList] = useState([]);
  const [isLike, setIsLike] = useState([]);
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const getDiary = () => {
    axios
      .get("http://43.200.19.7:8080/api/v1/review/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log("data", response.data);
        console.log(response.data.length);
        setRelayList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getDiary();
  }, []);

  const handleLikeClick = (e) => {
    console.log("target", e.target.parentElement.id);
    axios
      .post(
        `http://43.200.19.7:8080/api/v1/review/${e.target.parentElement.id}/like`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log("like", response);
        if (response.data === 1) {
          isLike[e.target.parentElement.id] = true;
          console.log(isLike);
        } else {
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error liking diary entry:", error);
      });
  };

  return (
    <Wrapper>
      <Relay>
        <RelayTxt>소감 릴레이</RelayTxt>
        <Btn
          onClick={() => {
            navigate("/diary/post");
          }}
        >
          글쓰기
        </Btn>
      </Relay>
      <Moment>챌린지를 진행하면서 뿌듯했던 순간들</Moment>
      <Sub>
        참여한 챌린지에서 뿌듯했거나 인상깊었던 순간들을 공유해보세요. <br />{" "}
        진심이 담긴 송이들의 소감이 모여 아름다운 물결을 이룹니다.
      </Sub>

      {relayList.map((diaryEntry) => (
        <DiaryBox key={diaryEntry.review_id}>
          <FlexBox>
            <ImgContainer>
              <ProfileImg src={profile} />
            </ImgContainer>
            <Div>
              <Name>{diaryEntry.writer}</Name>
              <Date>{diaryEntry.createdDate}</Date>
            </Div>
            <Div>
              <Title>{diaryEntry.title}</Title>
              <SubTitle>{diaryEntry.myChallenge}</SubTitle>
            </Div>
            <LikeDiv>
              <LikeBtn onClick={handleLikeClick} id={diaryEntry.review_id}>
                {diaryEntry.like === true ? (
                  <LikeImg src={like_on} />
                ) : (
                  <LikeImg src={like_off} />
                )}
              </LikeBtn>
              <Count>{diaryEntry.likeCount}</Count>
            </LikeDiv>
          </FlexBox>
          <Contents>{diaryEntry.content}</Contents>
        </DiaryBox>
      ))}
    </Wrapper>
  );
};

export default Diary;
