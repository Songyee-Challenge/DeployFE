import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wrapper = styled.div`
  padding-top: 22px;
  font-family: "Pretendard";
`;

const InfoTitle = styled.div`
font-size: 1.4rem;
border-bottom: 6px solid black;
font-weight: bolder;
height: 35px;
width: 160px;
margin-top: 8.8367px;
`;

const InfoBox = styled.div`
  border-top: 1px solid black;
  width: 75vw;
  margin-bottom: 50px;
  margin-top: 0px;
`;

const Box = styled.div`
  margin: 0 auto;
  padding-top: 50px;
  width: 500px;
`;

const Txt = styled.p`
  font-size: 1.2rem;
`;

const Container = styled.div`
  width: 100%;
  height: 80px;
  border-top: 0.06cm solid black;
  font-weight: bold;
`;

const Quit = styled.div`
  width: 100%;
  height: 100px;
  border-top: 0.06cm solid black;
  font-weight: bold;
  margin-top: 100px;
  font-size: 1.1rem;
`;

const DeleteUser = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`;

const MyInfo = () => {
  const [infoData, setInfoData] = useState([]);
  const navigate = useNavigate();
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const getInfo = () => {
    axios
      .get("http://43.200.19.7:8080/api/v1/mypage/info", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log(response);
        setInfoData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleUserDelete = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      axios
        .delete("http://43.200.19.7:8080/api/v1/mypage/delete-user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })
        .then((response) => {
          navigate("/login");
          console.log(response);
        })
        .catch((error) => {
          console.error("삭제 실패", error);
        });
    }
  };

  return (
    <Wrapper>
      <InfoTitle>내 정보 관리</InfoTitle>
      <InfoBox>
        <Box>
          <Txt>이름</Txt>
          <Container>
            <Txt>{infoData.name}</Txt>
          </Container>
          <Txt>전공</Txt>
          <Container>
            <Txt>{infoData.major}</Txt>
          </Container>
          <Txt>학번</Txt>
          <Container>
            <Txt>{infoData.student_id}</Txt>
          </Container>
          <Txt>현재 아이디(이메일)</Txt>
          <Container>
            <Txt>{infoData.email}</Txt>
          </Container>
          <Quit>
            <p style={{ color: "grey" }}>
              더 이상 송이의 숲을 사용하지 않는다면
            </p>
            <DeleteUser onClick={() => handleUserDelete()}>
              회원탈퇴 바로하기 {"   >"}
            </DeleteUser>
          </Quit>
        </Box>
      </InfoBox>
    </Wrapper>
  );
};

export default MyInfo;
