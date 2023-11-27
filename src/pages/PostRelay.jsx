import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  padding-top: 30px;
  margin: 0 auto;
  width: 92vw;
  font-family: "Pretendard";
`;

const Relay = styled.div`
  display: flex;
  border-bottom: 3px solid black;
`;

const RelayTxt = styled.p`
  font-size: 1.4rem;
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
  font-family: "Pretendard";
  font-weight: bolder;
`;

const Box = styled.div`
  width: 100%;
  border-radius: 10px;
  height: 250px;
`;

const FlexBox = styled.div`
  display: flex;
  margin-top: 40px;
`;

const Title = styled.input`
  border: none;
  outline: none;
  background-color: #f2f2f2;
  font-family: "Pretendard";
  font-size: 1.1rem;
  width: 55vw;
  height: 50px;
  padding-left: 20px;
`;

const Select = styled.select`
  border-radius: 10px;
  font-family: "Pretendard";
  font-size: 1rem;
  width: 300px;
  height: 50px;
  margin-left: 20px;
  margin-top: 0px;
  cursor: pointer;
  padding-left: 10px;
`;

const Contents = styled.textarea`
  border: none;
  border-radius: 10px;
  border-radius: 5px;
  outline: none;
  resize: none;
  background-color: #f2f2f2;
  font-family: "Pretendard";
  margin-top: 30px;
  font-size: 1.1rem;
  width: 90vw;
  padding: 20px;
  height: 250px;
`;

const Count = styled.div`
  margin: auto 10px 20px auto;
  width: 90px;
  color: #646464;
  padding-right: 0px;
  font-size: 1rem;
  margin-top: -40px;
`;

const PostRelay = () => {
  const navigate = useNavigate();
  const [inputCount, setInputCount] = useState(0);
  const [toggleOptions, setToggleOptions] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  let ACCESS_TOKEN = localStorage.getItem("accessToken");

  const getToggle = () => {
    axios
      .get("http://43.200.19.7:8080/api/v1/review/mychallenge", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((response) => {
        console.log(response);
        setToggleOptions(response.data);
        console.log(toggleOptions);
      });
  };

  useEffect(() => {
    getToggle();
  }, []);

  const handleUpload = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    axios
      .post(
        "http://43.200.19.7:8080/api/v1/review/post",
        {
          title: title,
          myChallenge: selectedChallenge,
          content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert("소감이 업로드되었습니다.");
        navigate("/diary");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onInputHandler = (e) => {
    setTitle(e.target.value);
  };

  const onChallengeSelect = (e) => {
    setSelectedChallenge(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
    setInputCount(e.target.value.length);
  };

  return (
    <Wrapper>
      <Relay>
        <RelayTxt>소감 릴레이</RelayTxt>
        <Btn onClick={handleUpload}>업로드</Btn>
      </Relay>
      <Box>
        <form>
          <FlexBox>
            <Title
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={onInputHandler}
            />
            <Select onChange={onChallengeSelect}>
              <option>챌린지 선택</option>
              {toggleOptions.map((option) => (
                <option key={option.id} value={option.challenge_title}>
                  {option.challenge_title}
                </option>
              ))}
            </Select>
          </FlexBox>
          <div>
            <Contents
              id="input_contents"
              placeholder="내용을 입력해주세요."
              maxLength="255"
              onChange={onContentChange}
            />
            <Count>
              <span>{inputCount}</span>
              <span>/255 자</span>
            </Count>
          </div>
        </form>
      </Box>
    </Wrapper>
  );
};

export default PostRelay;
