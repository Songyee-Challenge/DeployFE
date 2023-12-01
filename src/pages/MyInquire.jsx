import React, {useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  margin-left: 3vw;
  padding-top: 10px;
  display: flex;
  margin-bottom: 100px;
`;

const BigTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.4rem;
  border-bottom: 6px solid black;
  font-weight: bolder;
  height: 45px;
  width: 160px;
`;

const InquireBox = styled.div`
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

const MyInquire = () => {
  const [Username, setUsername] = useState([]);
  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const getUsername = () => {
    axios
      .get("http://43.200.19.7:8080/api/v1/mypage/name", {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log(response);
        setUsername(response.data);
      });
  };

  useEffect(() => {
    getUsername();
  }, []);

    return (
        <Wrapper>
            <BigTitle>
                <Title>1:1 문의</Title>
            </BigTitle>
            <InquireBox>
                <Container>
                {Username && (
                    <p>
                    {`${Username}님 불편을 드려 죄송합니다.`}
                    </p>
                )}
                </Container>
                <div>
                    갑자기 서비스에 특정 오류가 발생했을 경우 아래 연락처로 문의주시기 바랍니다.
                    송이의 숲은 항상 송이들의 편리한 서비스를 제공하기 위해 노력합니다.
                    songyeechallenge@gmail.com
                </div>
            </InquireBox>
        </Wrapper>
    )
}

export default MyInquire;