import React, { useState, useEffect } from "react";
import styled from "styled-components";
import like_off from "../images/like_off.png";
import like_on from "../images/like_on.png";
import remove from "../images/remove.png";
import axios from "axios";

const Wrapper = styled.div`
  padding-top: 22px;
  font-family: "Pretendard";
`;

const BigTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Review = styled.div`
  font-size: 1.4rem;
  border-bottom: 6px solid black;
  font-weight: bolder;
  height: 45px;
  width: 160px;
`;

const Num = styled.p`
  font-family: "Dongle-regular", sans-serif;
  font-size: 2rem;
  font-weight: 900;
  margin: 0px 50px;
  white-space: nowrap;
`;

const ReviewBox = styled.div`
  border-top: 1px solid black;
  width: 75vw;
  display: flex;
  margin-bottom: 50px;
`;

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0cm 0.5cm 0.5cm 0cm #dddddd;
  width: 75vw;
  height: 240px;
  margin-top: 35px;
  background-color: #f2f2f2;
  padding-bottom: 15px;
`;

const FlexBox = styled.div`
  display: flex;
  width: 75vw;
  height: 90px;
  min-height: 90px;
  background-color: white;
  border: 1px solid #dddddd;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 20px 10px;
  box-sizing: border-box;
  border-top: 0.01cm solid #dddddd;
`;

const Div = styled.div`
  height: 60px;
  margin: -20px 15px 0;
`;

const Title = styled.p`
  font-size: 1.4rem;
  font-weight: bolder;
  margin-top: 17px;
`;

const SubTitle = styled.p`
  font-size: 1rem;
  font-weight: bolder;
  margin-top: -15px;
`;

const Date = styled.p`
  font-family: "Dongle-regular", sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  margin: 10px;
`;

const LikeDiv = styled.div`
  display: flex;
  margin: auto 15px 0px auto;
  gap: 15px;
`;

const LikeBtn = styled.img`
  width: 25px;
  height: 25px;
  margin-top: 13px;
  cursor: pointer;
`;

const Count = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #646464;
  margin-top: 13px;
  width: 30px;
`;

const Contents = styled.p`
  padding-left: 30px;
  font-size: 1.2rem;
`;

const TxtDiv = styled.div`
  width: 68vw;
  display: flex;
  padding: 10px;
  background-color: #f2f2f2;

  @media (max-width: 750px) {
    width: 30vw;
  }
`;

const BtnBox = styled.div`
  margin: 105px -50px 0px auto;
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  z-index: 8000;
`;

const Btn = styled.img`
  font-size: 1.1rem;
  font-weight: bolder;
  border-radius: 3px;
  width: 75px;
  height: 50px;
  cursor: pointer;
  z-index: 8000;
`;

const MyReview = () => {
  const [reviews, setReviews] = useState([]);
  const [isLiked, setIsLiked] = useState([]);
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const getReview = () => {
    axios
      .get("http://43.200.19.7:8080/api/v1/mypage/review", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log(response);
        setReviews(response.data);
      });
  };

  useEffect(() => {
    getReview();
  }, []);

  const handleLikeClick = (e) => {
    console.log(e.target.id);
    console.log(ACCESS_TOKEN);
    window.location.reload();
    axios
      .post(
        `http://43.200.19.7:8080/api/v1/review/${e.target.id}/like`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data === 1) {
          setIsLiked(1);
        } else {
          setIsLiked(0);
        }
      })
      .catch((error) => {
        console.error("Error liking diary entry:", error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .delete(`http://43.200.19.7:8080/api/v1/mypage/review/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          window.location.reload();
          console.log(response);
        })
        .catch((error) => {
          console.error("삭제 실패", error);
          console.log(id);
        });
    }
  };

  return (
    <Wrapper>
      <BigTitle>
        <Review>챌린지 소감</Review>
        <Num>총 {reviews.length}개</Num>
      </BigTitle>
      <ReviewBox>
        <div>
          {reviews.map((review) => (
            <Container key={review.review_id}>
              <FlexBox>
                <Div>
                  <Title>{review.title}</Title>
                  <SubTitle>{review.myChallenge}</SubTitle>
                </Div>
                <LikeDiv>
                  <Date>{review.createdDate}</Date>
                  <LikeBtn
                    src={remove}
                    onClick={() => handleDelete(review.review_id)}
                  ></LikeBtn>
                </LikeDiv>
              </FlexBox>
              <Contents>
                <TxtDiv>{review.content}</TxtDiv>
              </Contents>
            </Container>
          ))}
        </div>
      </ReviewBox>
    </Wrapper>
  );
};

export default MyReview;
